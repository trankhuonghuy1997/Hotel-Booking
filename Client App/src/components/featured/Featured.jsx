import "./featured.css";
import img1 from "../../Data/City Image/Da Nang.jpg";
import img2 from "../../Data/City Image/Ha Noi.jpg";
import img3 from "../../Data/City Image/HCM.jpg";
import { useEffect, useState } from "react";
import fetchData from "../../Data/fetch";

const Featured = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetchData();
      setHotels(data.results);
    }
    getData();
  }, []);

  const hnProperties = hotels.filter((hotel) => hotel.city === "Ha Noi");
  const dnProperties = hotels.filter((hotel) => hotel.city === "Da Nang");
  const hcmProperties = hotels.filter((hotel) => hotel.city === "Ho Chi Minh");
  // console.log(hnProperties, hcmProperties);
  return (
    <div className="featured">
      <div className="featuredItem">
        <img src={img1} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{dnProperties.length} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src={img2} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{hnProperties.length} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src={img3} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{hcmProperties.length} properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
