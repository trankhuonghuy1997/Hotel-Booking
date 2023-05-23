import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import BookingPage from "../booking/BookingPage";
import { SearchContext } from "../../context/searchContext";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [roomsList, setRoomsList] = useState([]);
  const id = useParams("id");
  const [hotel, setHotel] = useState({});
  const [showBookingPage, setShowBookingPage] = useState(false);

  useEffect(() => {
    async function fetchDetail(id) {
      const response = await fetch(`http://localhost:5000/hotels/${id.id}`);
      const data = await response.json();
      setHotel(data);
      return data;
    }
    fetchDetail(id);
  }, [id]);

  const getRoomsDetail = async (hotel) => {
    const roomUrl = hotel.rooms.map((room) => {
      return `http://localhost:5000/rooms/${room}`;
    });

    const result = await Promise.all(
      roomUrl.map((url) => fetch(url).then((res) => res.json()))
    );
    const data = result.map((res) => {
      return { ...res[0] };
    });

    setRoomsList(data);
  };

  const showBookingPagehandler = () => {
    setShowBookingPage((showBookingPage) => !showBookingPage);
    getRoomsDetail(hotel);
  };

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const length = hotel.photos ? hotel.photos.length : 4;

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === length - 1 ? 0 : slideNumber + 1;
    }
    console.log(newSlideNumber);

    setSlideNumber(newSlideNumber);
  };

  const { destination, date, options } = useContext(SearchContext);

  const hiringDate =
    new Date(date[0].endDate).getTime() - new Date(date[0].startDate).getTime();

  const day = hiringDate / 1000 / 86400;

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img
                src={hotel.photos[slideNumber]}
                alt=""
                className="sliderImg"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        {hotel && (
          <div className="hotelWrapper">
            <button className="bookNow" onClick={showBookingPagehandler}>
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{hotel.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{hotel.city}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {hotel.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${hotel.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {hotel.photos &&
                hotel.photos.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{hotel.title}</h1>
                <p className="hotelDesc">{hotel.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {day}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${hotel.cheapestPrice * day * options.room}</b> <br />(
                  {day} nights - {options.room} rooms)
                </h2>
                <button onClick={showBookingPagehandler}>
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        )}
        {showBookingPage && <BookingPage roomsList={roomsList} />}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
