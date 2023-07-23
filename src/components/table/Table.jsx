import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/pharmacy_app_api/admin/orders.php');
        if (response.ok) {
          const data = await response.json();
          // Sort the data array by createdAt in descending order
          const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          const latestThreeOrders = sortedData.slice(0, 3);
          setRows(latestThreeOrders);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">OrderID</TableCell>
              <TableCell className="tableCell">Products</TableCell>
              <TableCell className="tableCell">Date and Time Ordered</TableCell>
              <TableCell className="tableCell">Quantity</TableCell>
              <TableCell className="tableCell">Total Price</TableCell>
              <TableCell className="tableCell"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              row.items.map((item) => (
                <TableRow key={`${row.id}-${item.itemId}`}>
                  <TableCell className="tableCell">{row.id}</TableCell>
                  <TableCell className="tableCell">{item.itemName}</TableCell>
                  <TableCell className="tableCell">{row.createdAt}</TableCell>
                  <TableCell className="tableCell">{item.quantity}</TableCell>
                  <TableCell className="tableCell">{item.totalPrice}</TableCell>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="seeAll">
        <Link to="/orders" className="seeAllLink">
          See All
        </Link>
      </div>
    </div>
  );
};

export default List;
