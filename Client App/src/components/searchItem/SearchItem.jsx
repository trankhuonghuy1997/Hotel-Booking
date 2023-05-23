import "./searchItem.css";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ result }) => {
  const navigate = useNavigate();
  return (
    <div className="searchItem">
      <img src={result.img_url} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{result.name}</h1>
        <span className="siDistance">{result.distance}m from center</span>
        <span className="siTaxiOp">{result.tag}</span>
        <span className="siSubtitle">{result.description}</span>
        <span className="siFeatures">{result.type.toUpperCase()}</span>
        {/* If can cancel */}
        {result.free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{result.rate_text}</span>
          <button>{result.rate}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${result.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button
            className="siCheckButton"
            onClick={() => {
              navigate(`/hotels/${result._id}`, { state: { result } });
            }}
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
