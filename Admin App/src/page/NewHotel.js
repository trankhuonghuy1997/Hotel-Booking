import classes from "./NewHotel.module.css";
import Card from "../Component/Card";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewHotelPage = ({ edit }) => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [enteredName, setEnteredName] = useState("");
  const [enteredType, setEnteredType] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredDistance, setEnteredDistance] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [enteredCheapestprice, setEnteredCheapestprice] = useState(undefined);
  const [enteredPhotos, setEnteredPhotos] = useState("");
  const [enteredRooms, setEnteredRooms] = useState("");
  const [enteredFeatured, setEnteredFeatured] = useState(undefined);
  const [enteredTitle, setEnteredTitle] = useState("");

  useEffect(() => {
    if (edit) {
      async function gethotelDetail() {
        const response = await fetch(
          `http://localhost:5000/admin/hotels/${id}`
        );
        const data = await response.json();
        setEnteredName(data.name);
        setEnteredType(data.type);
        setEnteredCity(data.city);
        setEnteredAddress(data.address);
        setEnteredCheapestprice(data.cheapestPrice);
        setEnteredDesc(data.desc);
        setEnteredDistance(data.distance);
        setEnteredTitle(data.title);
        setEnteredPhotos([...data.photos].join(","));
        setEnteredRooms([...data.rooms].join(","));
        setEnteredFeatured(data.featured);
      }
      gethotelDetail();
    }
  }, [edit, id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = enteredName;
    const type = enteredType;
    const city = enteredCity;
    const address = enteredAddress;
    const distance = enteredDistance;
    const desc = enteredDesc;
    const cheapestPrice = enteredCheapestprice;
    const photos = [...enteredPhotos.split(",")];
    const rooms = [...enteredRooms.split(",")];
    const featured = enteredFeatured;
    const title = enteredTitle;
    const newHotel = {
      name,
      type,
      city,
      address,
      distance,
      photos,
      desc,
      rooms,
      featured,
      cheapestPrice,
      title,
    };
    if (edit) {
      await fetch(`http://localhost:5000/admin/hotels/update-hotel/${id}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHotel),
      });
    } else {
      await fetch("http://localhost:5000/admin/hotels/create-hotel", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHotel),
      });
    }
    navigate("/hotels");
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        {edit ? "Edit Hotel" : "Add new Hotel"}
      </div>
      <Card>
        <form className={classes.form_control} onSubmit={submitHandler}>
          <div className={classes.form}>
            <label>Name</label>
            <input
              type="text"
              required
              placeholder="My Hotel"
              value={enteredName}
              onChange={(e) => {
                setEnteredName(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.form}>
            <label>Type</label>
            <input
              type="text"
              required
              placeholder="hotel"
              value={enteredType}
              onChange={(e) => {
                setEnteredType(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.form}>
            <label>City</label>
            <input
              type="text"
              required
              placeholder="Ho Chi Minh"
              value={enteredCity}
              onChange={(e) => {
                setEnteredCity(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.form}>
            <label>Address</label>
            <input
              type="address"
              required
              placeholder="ward 1"
              value={enteredAddress}
              onChange={(e) => {
                setEnteredAddress(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.form}>
            <label>Distance from City Center</label>
            <input
              type="number"
              required
              placeholder="500"
              min={0}
              value={enteredDistance}
              onChange={(e) => {
                setEnteredDistance(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.form}>
            <label>Title</label>
            <input
              type="text"
              required
              placeholder="The best Hotel"
              value={enteredTitle}
              onChange={(e) => {
                setEnteredTitle(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.form}>
            <label>Description</label>
            <input
              type="text"
              required
              placeholder="Description"
              value={enteredDesc}
              onChange={(e) => {
                setEnteredDesc(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.form}>
            <label>Price</label>
            <input
              type="number"
              required
              placeholder={100}
              value={enteredCheapestprice}
              onChange={(e) => {
                setEnteredCheapestprice(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.form}>
            <label>Image</label>
            <input
              type="text"
              value={enteredPhotos}
              onChange={(e) => {
                setEnteredPhotos(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.form}>
            <label>Featured</label>
            <select
              value={enteredFeatured}
              onChange={(e) => {
                setEnteredFeatured(e.target.value);
              }}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className={classes.form}>
            <label>Rooms</label>
            <textarea
              className={classes.input_room}
              cols="10"
              type="text"
              value={enteredRooms}
              onChange={(e) => {
                setEnteredRooms(e.target.value);
              }}
            ></textarea>
          </div>
          <button className={classes.btn} type="submit">
            {edit ? "Update Hotel" : "Send"}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default NewHotelPage;
