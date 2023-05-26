import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import classes from "./Transaction.module.css";

const Transaction = () => {
  const userId = JSON.parse(localStorage.getItem("token"));
  const [transaction, setTransaction] = useState([]);
  const [hotelNameList, setHotelnameList] = useState([]);
  useEffect(() => {
    async function getTransaction() {
      const response = await fetch(
        `http://localhost:5000/transaction/${userId}`
      );
      const data = await response.json();
      setTransaction(data);
    }
    getTransaction();
  }, [userId]);
  if (transaction.length > 0) {
    const hotelNameId = transaction.map((tran) => tran.hotel);
    const getHotelname = async (hotelNameId) => {
      const hotelUrl = hotelNameId.map((ht) => {
        return `http://localhost:5000/hotels/${ht}`;
      });

      const result = await Promise.all(
        hotelUrl.map((url) => fetch(url).then((res) => res.json()))
      );
      const data = result.map((res) => {
        return res.name;
      });
      setHotelnameList(data);
    };
    getHotelname(hotelNameId);
  }
  return (
    <>
      <Navbar />
      <div className={classes.tran}>
        <h1>Your Transaction</h1>
        <table>
          <tr>
            <th>#</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment method</th>
            <th>Status</th>
          </tr>
          {transaction.map((tran, index) => {
            return (
              <tr key={tran._id}>
                <td>{`0${index + 1}`}</td>
                <td>{hotelNameList[index]}</td>
                <td>{tran.room.map((i) => i.roomNumber).join(", ")}</td>
                <td>
                  {`${new Date(tran.dateStart).getDate()}/${new Date(
                    tran.dateStart
                  ).getMonth()}/${new Date(
                    tran.dateStart
                  ).getFullYear()}-${new Date(
                    tran.dateEnd
                  ).getDate()}/${new Date(tran.dateEnd).getMonth()}/${new Date(
                    tran.dateEnd
                  ).getFullYear()}`}
                </td>
                <td>
                  $
                  {tran.room
                    .map((i) => i.price)
                    .reduce((acc, curr) => acc + curr, 0)}
                </td>
                <td>{tran.payment}</td>
                <td>{tran.status}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Transaction;
