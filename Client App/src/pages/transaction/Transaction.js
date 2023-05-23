import Navbar from "../../components/navbar/Navbar";
import classes from "./Transaction.module.css";

const Transaction = () => {
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
            <th>Pagement method</th>
            <th>status</th>
          </tr>
          <tr>
            <td>01</td>
            <td>HANOI ROYAL PALACE HOTEL 2</td>
            <td>101, 102</td>
            <td>20/03/2023-21/03/2023</td>
            <td>$1000</td>
            <td>Cash</td>
            <td>checkin</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Transaction;
