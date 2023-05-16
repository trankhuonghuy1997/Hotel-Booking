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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const id = useParams("id");
  const [hotel, setHotel] = useState({});

  useEffect(() => {
    async function fetchDetail(id) {
      const response = await fetch(`http://localhost:5000/hotels/${id.id}`);
      const data = await response.json();
      setHotel(data);
      return data;
    }
    fetchDetail(id);
  }, [id]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const length = hotel.photos ? hotel.photos.length : 4;

  const handleMove = (direction) => {
    let newSlideNumber;
    console.log(length);

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === length - 1 ? 0 : slideNumber + 1;
    }
    console.log(newSlideNumber);

    setSlideNumber(newSlideNumber);
  };

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
            <button className="bookNow">Reserve or Book Now!</button>
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
                <h1>Perfect for a 9-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>$945</b> (9 nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        )}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
