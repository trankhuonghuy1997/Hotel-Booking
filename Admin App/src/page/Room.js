import Card from "../Component/Card";
import classes from "./Room.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const RoomPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/new-room");
  };
  const handleEditClick = (params) => {
    const id = params.row.col1;
    navigate(`/edit-room/${id}`);
  };

  const handleDeleteClick = async (params) => {
    const roomId = params.row.col1;
    console.log(roomId);
    const response = await fetch(
      `http://localhost:5000/admin/rooms/delete-room/${roomId}`,
      { method: "delete" }
    );
    const data = await response.json();
    console.log(data);
  };
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    async function getRoom() {
      const response = await fetch("http://localhost:5000/admin/rooms");
      const data = await response.json();
      setRoomList(data);
    }
    getRoom();
  }, [roomList]);

  const rows = roomList.map((room, index) => {
    return {
      id: index,
      col1: room._id,
      col2: room.title,
      col3: room.desc,
      col4: room.price,
      col5: room.maxPeople,
      col6: "Delete",
    };
  });

  const columns = [
    { field: "col1", headerName: "ID", width: 250 },
    { field: "col2", headerName: "Title", width: 200 },
    { field: "col3", headerName: "Description", width: 500 },
    { field: "col4", headerName: "Price", width: 100 },
    { field: "col5", headerName: "Max People", width: 100 },
    {
      field: "col6",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <button
            style={{
              padding: "5px 10px",
              color: "green",
              backgroundColor: "#fff",
              border: "1px solid green",
              cursor: "pointer",
            }}
            onClick={() => {
              handleEditClick(params);
            }}
          >
            Edit
          </button>
          <button
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              color: "red",
              backgroundColor: "#fff",
              border: "1px solid red",
              cursor: "pointer",
            }}
            onClick={() => {
              handleDeleteClick(params);
            }}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className={classes.container}>
      <Card>
        <div className={classes.title}>
          <h3>Rooms List</h3>
          <button className={classes.btn} onClick={handleClick}>
            Add New
          </button>
        </div>
        <DataGrid rows={rows} columns={columns} />
      </Card>
    </div>
  );
};

export default RoomPage;
