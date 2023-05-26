import classes from "./HomePage.module.css";
import Card from "../Component/Card";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [latestTransaction, setLatestTransaction] = useState([]);
  const [users, setUser] = useState();
  const [orders, setOrders] = useState();
  const [earning, setEarning] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    async function getTransaction() {
      const response = await fetch("http://localhost:5000/admin/transactions");
      const data = await response.json();
      const getLatestTransaction = data.sort(
        (a, b) => new Date(b.dateEnd).getTime() - new Date(a.dateEnd).getTime()
      );
      setLatestTransaction(
        getLatestTransaction.filter((item, index) => index <= 7)
      );
      const allUser = [...new Set(data.map((item) => item.user))];
      setUser(allUser.length);
      setOrders(data.length);
      const allEarning = data
        .filter((item) => item.status !== "Booked")
        .map((item) => item.price)
        .reduce((acc, curr) => acc + curr, 0);
      const allBalance = data
        .map((item) => item.price)
        .reduce((acc, curr) => acc + curr, 0);
      setEarning(allEarning);
      setBalance(allBalance);
    }
    getTransaction();
  }, []);
  const rows = latestTransaction.map((transaction, index) => {
    return {
      id: index,
      col1: transaction._id,
      col2: transaction.user,
      col3: transaction.hotel,
      col4: transaction.room.map((item) => item.roomNumber).join(","),
      col5: `${new Date(transaction.dateStart).getDate()}/${new Date(
        transaction.dateStart
      ).getMonth()}/${new Date(transaction.dateStart).getFullYear()}-${new Date(
        transaction.dateEnd
      ).getDate()}/${new Date(transaction.dateEnd).getMonth()}/${new Date(
        transaction.dateEnd
      ).getFullYear()}`,
      col6: `$ ${transaction.price}`,
      col7: transaction.payment,
      col8: transaction.status,
    };
  });

  const columns = [
    { field: "col1", headerName: "ID", width: 250 },
    { field: "col2", headerName: "User", width: 150 },
    { field: "col3", headerName: "Hotel", width: 250 },
    { field: "col4", headerName: "Room", width: 200 },
    { field: "col5", headerName: "Date", width: 200 },
    { field: "col6", headerName: "Price", width: 100 },
    { field: "col7", headerName: "Payment Method", width: 200 },
    { field: "col8", headerName: "Status", width: 150 },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Card>
          <h3>users</h3>
          <h5>{users}</h5>
          <span className={`${classes.icon} ${classes.user}`}>
            <i className="fa-solid fa-user"></i>
          </span>
        </Card>
        <Card>
          <h3>orders</h3>
          <h5>{orders}</h5>
          <span className={`${classes.icon} ${classes.orders}`}>
            <i className="fa-solid fa-cart-shopping"></i>
          </span>
        </Card>
        <Card>
          <h3>earning</h3>
          <h5>${earning}</h5>
          <span className={`${classes.icon} ${classes.earning}`}>
            <i className="fa-solid fa-sack-dollar"></i>
          </span>
        </Card>
        <Card>
          <h3>balance</h3>
          <h5>${balance}</h5>
          <span className={`${classes.icon} ${classes.balance}`}>
            <i className="fa-sharp fa-solid fa-scale-balanced"></i>
          </span>
        </Card>
      </div>
      <div className={classes.body}>
        <Card>
          <h3>Latest Transactions</h3>
          <DataGrid rows={rows} columns={columns} />
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
