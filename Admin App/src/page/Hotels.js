import Card from "../Component/Card";
import classes from "./Hotel.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const HotelPage = () => {
  const [hotelList, sethotelList] = useState([]);
  const handleEditClick = (params) => {
    const id = params.row.col1;
    navigate(`/edit-hotel/${id}`);
  };

  const deleteHotelhandler = async (params) => {
    const hotelId = params.row.col1;
    await fetch(`http://localhost:5000/admin/hotels/delete-hotel/${hotelId}`, {
      method: "delete",
    });
  };
  useEffect(() => {
    async function gethotel() {
      const response = await fetch("http://localhost:5000/admin/hotels");
      const data = await response.json();
      sethotelList(data);
    }
    gethotel();
  }, [hotelList]);
  const rows = hotelList.map((hotel, index) => {
    return {
      id: index,
      col1: hotel._id,
      col2: hotel.name,
      col3: hotel.type,
      col4: hotel.title,
      col5: hotel.city,
      col6: "Delelte",
    };
  });

  const columns = [
    { field: "col1", headerName: "ID", width: 250 },
    { field: "col2", headerName: "Name", width: 300 },
    { field: "col3", headerName: "Type", width: 150 },
    { field: "col4", headerName: "Title", width: 300 },
    { field: "col5", headerName: "City", width: 150 },
    {
      field: "col6",
      headerName: "Action",
      width: 150,
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
              deleteHotelhandler(params);
            }}
          >
            Delete
          </button>
        </>
      ),
    },
  ];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/new-hotel");
  };

  return (
    <div className={classes.container}>
      <Card>
        <div className={classes.title}>
          <h3>Hotel List</h3>
          <button className={classes.btn} onClick={handleClick}>
            Add New
          </button>
        </div>
        <DataGrid rows={rows} columns={columns} rowSelection={false} />
      </Card>
    </div>
  );
};

export default HotelPage;
