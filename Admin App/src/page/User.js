import Card from "../Component/Card";
import classes from "./User.module.css";
import { DataGrid } from "@mui/x-data-grid";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";

const UserPage = () => {
  const [usersList, setUserList] = useState([]);
  useEffect(() => {
    async function getUser() {
      const response = await fetch("http://localhost:5000/admin/users");
      const data = await response.json();
      console.log(data);
      setUserList(data);
    }
    getUser();
  }, []);
  console.log(DataGrid);
  const rows = usersList.map((user, index) => {
    return {
      id: index,
      col1: user._id,
      col2: user.userName,
      col3: user.email,
      col4: user.isAdmin ? "Yes" : "No",
    };
  });

  const columns = [
    { field: "col1", headerName: "ID", width: 250 },
    { field: "col2", headerName: "User Name", width: 200 },
    { field: "col3", headerName: "Email", width: 300 },
    { field: "col4", headerName: "Is Admin", width: 150 },
  ];

  return (
    <div className={classes.container}>
      <Card>
        <div className={classes.title}>
          <h3 className={classes.title}>User List</h3>
        </div>
        <DataGrid rows={rows} columns={columns} />
      </Card>
    </div>
  );
};

export default UserPage;
