import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { useRef } from "react";

const List = () => {
  const location = useLocation();
  const destinationRef = useRef();
  const state = location.state;
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [searchResults, setSearchResults] = useState([]);
  console.log(state);
  async function fetchSearch(destination) {
    const response = await fetch(
      `http://localhost:5000/search?city=${destination}`
    );
    const data = await response.json();
    console.log(data);
    setSearchResults(data);
  }

  useEffect(() => {
    fetchSearch(state.destination);
  }, [state]);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                ref={destinationRef}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                fetchSearch(destinationRef.current.value);
              }}
            >
              Search
            </button>
          </div>
          <div className="listResult">
            {searchResults &&
              searchResults.map((result) => {
                return (
                  <SearchItem
                    name={result.name}
                    distance={result.distance}
                    type={result.type}
                    description={result.description}
                    price={result.cheapestPrice}
                    img_url={result.photos[0]}
                  />
                );
              })}
            {searchResults.length === 0 && state.destination && (
              <h1>No Hotels Available!!!</h1>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
