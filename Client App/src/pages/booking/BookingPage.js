import React, { useState, useRef } from "react";
import classes from "./BookingPage.module.css";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BookingPage = ({ roomsList }) => {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const selectPaymentRef = useRef();
  const phoneRef = useRef();
  const idNumberRef = useRef();
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];
  const [selectRoom, setSelectRoom] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log(checked, value);
    setSelectRoom(
      checked
        ? [...selectRoom, value]
        : selectRoom.filter((item) => item !== value)
    );
  };

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 86400),
      key: "selection",
    },
  ]);

  const hiringDate =
    new Date(date[0].endDate).getTime() - new Date(date[0].startDate).getTime();

  const day = hiringDate / 1000 / 86400;
  console.log(date);

  const handleClick = (e) => {
    e.preventDefault();
    const body = {
      user: fullNameRef.current.value,
      // userId:
      hotel: hotelId,
      room: selectRoom,
      dateStart: new Date(date[0].startDate),
      dateEnd: new Date(date[0].endDate),
      price: 123,
      payment: selectPaymentRef.current.value,
      status: "check in",
    };
    fetch("http://localhost:5000/transaction", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    navigate("/transaction");
  };

  return (
    <form className={classes.main}>
      <form className={classes.header}>
        <div className={classes.left}>
          <h1>Date</h1>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
          />
        </div>
        <div className={classes.right}>
          <h1>Reverse Info</h1>
          <div>
            <label htmlFor="fullName">Your Full Name</label>
            <input
              id="fullName"
              type="text"
              required
              placeholder="Full Name"
              ref={fullNameRef}
            ></input>

            <label htmlFor="email">Your Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="Email"
              ref={emailRef}
            ></input>

            <label htmlFor="tel">Your Phone Number</label>
            <input
              id="tel"
              type="tel"
              required
              placeholder="Phone Number"
              ref={phoneRef}
            ></input>

            <label htmlFor="idNumber">Your Identy Card Number</label>
            <input
              id="idNumber"
              type="text"
              required
              placeholder="Identify Number"
              ref={idNumberRef}
            ></input>
          </div>
        </div>
      </form>

      <form className={classes.footer}>
        <div className={classes.room}>
          <h1>Select Room</h1>
          {roomsList.map((room) => {
            return (
              <div className={classes.allRoom}>
                <div className={classes.room_list}>
                  <div className={classes.room_item}>
                    <h4>{room.title}</h4>
                    <p>{room.desc}</p>
                    <p>Max People: {room.maxPeople}</p>
                    <b>${room.price}</b>
                  </div>
                  <div className={classes.checkbox}>
                    {room.roomNumbers.map((roomNumber) => {
                      return (
                        <form>
                          <label htmlFor={`${room._id}-${roomNumber}`}>
                            {roomNumber}
                          </label>
                          <input
                            type="checkbox"
                            id={`${room._id}-${roomNumber}`}
                            value={roomNumber}
                            onChange={handleSelect}
                          ></input>
                        </form>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={classes.checkout}>
          <div className={classes.payment}>
            <h1>Total Bill: ${day}</h1>
            <select ref={selectPaymentRef}>
              <option>Select Payment Method</option>
              <option>Credit Card</option>
              <option>Cash</option>
            </select>
          </div>
        </div>
      </form>
      <button type="submit" className={classes.btn} onClick={handleClick}>
        Reserve Now!
      </button>
    </form>
  );
};

export default BookingPage;
