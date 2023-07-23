import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const OrderList = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/pharmacy_app_api/admin/orders.php');
        if (response.ok) {
          const data = await response.json();
          setRows(data);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost/pharmacy_app_api/admin/delete_order.php?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRows(rows.filter((row) => row.id !== id));
      } else {
        throw new Error('Failed to delete order');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRowHeight = () => 160;

  const columns = [
    { field: "id", headerName: "OrderID", width: 80 },
    { field: "userId", headerName: "User ID", width: 80 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "address", headerName: "Delivery Address", width: 400 },
    {
      field: "items",
      headerName: "Items",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {params.value.map((item) => (
              <div key={item.id}>
                Name: {item.itemName}
                <br />
                Quantity: {item.quantity}
                <br />
                Total Price: {item.totalPrice}
                <br />
              </div>
            ))}
          </div>
        );
      },
    },
    {
      field: "deliveryCoordinates",
      headerName: "Delivery Coordinates",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.value.latitude}, {params.value.longitude}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Date Ordered",
      width: 120,
      renderCell: (params) => {
        // Adjust the date format according to your requirements
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="top">
          <h1 className="pageTitle">Orders</h1>
        </div>
        <div className="datagrid">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowHeight={getRowHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderList;
