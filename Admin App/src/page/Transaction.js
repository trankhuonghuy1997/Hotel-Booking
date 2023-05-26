import classes from "./Transaction.module.css";
import Card from "../Component/Card";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

const TransactionPage = () => {
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    async function getTransaction() {
      const response = await fetch("http://localhost:5000/admin/transactions");
      const data = await response.json();
      setTransactionList(data);
    }
    getTransaction();
  }, []);
  const rows = transactionList.map((transaction, index) => {
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
      <div className={classes.body}>
        <Card>
          <h3 className={classes.title}>Transaction list</h3>
          <DataGrid rows={rows} columns={columns} />
        </Card>
      </div>
    </div>
  );
};

export default TransactionPage;
