import "./featuredProperties.css";
import { SearchContext } from "../../context/searchContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const FeaturedProperties = (props) => {
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleClick = (hotel) => {
    dispatch({
      type: "NO_SEARCH",
      payload: {
        destination: hotel.city,
        date: [
          {
            startDate: new Date(),
            endDate: new Date(new Date().getTime() + 1000 * 86400),
            key: "selection",
          },
        ],
        options: {
          adult: 1,
          children: 0,
          room: 1,
        },
      },
    });
    navigate(`/hotels/${hotel._id}`);
  };
  return (
    <div className="fp">
      {props.hotels.map((hotel) => {
        return (
          <div key={hotel._id} className="fpItem">
            <img src={hotel.photos[0]} alt="" className="fpImg" />
            <span className="fpName">
              <p
                onClick={() => {
                  handleClick(hotel);
                }}
              >
                {hotel.name}
              </p>
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
