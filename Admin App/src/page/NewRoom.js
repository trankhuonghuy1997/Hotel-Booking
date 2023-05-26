import classes from "./NewRoom.module.css";
import Card from "../Component/Card";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewHotelPage = ({ edit }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [hotelList, sethotelList] = useState([]);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");
  const [enteredPrice, setEnteredPrice] = useState(undefined);
  const [enteredMaxPeople, setEnteredMaxPeople] = useState(undefined);
  const [enteredHotel, setEnteredHotel] = useState("");
  const [enteredRoom, setEnteredRoom] = useState("");

  useEffect(() => {
    async function gethotel() {
      const response = await fetch("http://localhost:5000/admin/hotels");
      const data = await response.json();
      sethotelList(data);
    }
    gethotel();
  }, []);

  useEffect(() => {
    if (edit) {
      const id = params.id;
      async function getRoomDetail() {
        const response = await fetch(`http://localhost:5000/admin/rooms/${id}`);
        const data = await response.json();
        setEnteredTitle(data[0].title);
        setEnteredDesc(data[0].desc);
        setEnteredPrice(data[0].price);
        setEnteredMaxPeople(data[0].maxPeople);
        setEnteredHotel(data[0].hotel);
        setEnteredRoom([...data[0].roomNumbers].join(","));
      }
      getRoomDetail();
    }
  }, [params, edit]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const title = enteredTitle;
    const desc = enteredDesc;
    const price = enteredPrice;
    const maxPeople = enteredMaxPeople;
    const hotel = enteredHotel;
    const roomNumbers = [...enteredRoom.split(",")];
    const newRoom = { title, price, maxPeople, roomNumbers, desc };
    if (edit) {
      console.log(newRoom);
      await fetch(
        `http://localhost:5000/admin/rooms/update-room/${params.id}`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRoom),
        }
      );
    } else {
      await fetch(`http://localhost:5000/admin/rooms/create-room/${hotel}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });
    }
    navigate("/rooms");
  };
  return (
    <div className={classes.container}>
      <div className={classes.title}>{edit ? "Edit Room" : "Add new Room"}</div>
      <Card>
        <form className={classes.form_control} onSubmit={submitHandler}>
          <div className={classes.form}>
            <label>Title</label>
            <input
              type="text"
              required
              placeholder="My Room"
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
              value={enteredPrice}
              onChange={(e) => {
                setEnteredPrice(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.form}>
            <label>Max People</label>
            <input
              type="number"
              required
              min={0}
              value={enteredMaxPeople}
              onChange={(e) => {
                setEnteredMaxPeople(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.form}>
            <label>Choose a hotel</label>
            <select
              value={enteredHotel}
              onChange={(e) => {
                setEnteredHotel(e.target.value);
              }}
            >
              {hotelList.map((hotel) => {
                return (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={classes.form}>
            <label>Rooms</label>
            <textarea
              className={classes.input_room}
              cols="10"
              type="text"
              required
              placeholder="Give comma between number"
              value={enteredRoom}
              onChange={(e) => {
                setEnteredRoom(e.target.value);
              }}
            ></textarea>
          </div>
          <button className={classes.btn}>
            {edit ? "Update Room" : "Send"}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default NewHotelPage;
