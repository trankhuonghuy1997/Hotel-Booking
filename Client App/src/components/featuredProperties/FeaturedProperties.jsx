import "./featuredProperties.css";
// import { useEffect, useState } from "react";

const FeaturedProperties = (props) => {
  // const [hotel, setHotel] = useState([]);

  return (
    <div className="fp">
      {props.hotels.map((hotel) => {
        return (
          <div key={hotel.id} className="fpItem">
            <img src={hotel.photos[0]} alt="" className="fpImg" />
            <span className="fpName">
              <a href={`/hotels/${hotel._id}`} target="_blank" rel="noreferrer">
                {hotel.name}
              </a>
            </span>
            <span className="fpCity">{hotel.city}</span>
            <span className="fpPrice">
              Starting from ${hotel.cheapestPrice}
            </span>
            <div className="fpRating">
              <button>8.9</button>
              <span>Excellent</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedProperties;
