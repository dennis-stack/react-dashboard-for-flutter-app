import { useEffect, useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import "./widget.scss";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost/pharmacy_app_api/admin/widget_data.php?type=${type}`);
        if (response.ok) {
          const data = await response.json();
          setAmount(data.amount);

          if (type === "product") {
            setDiff(data.diff);
          }
        } else {
          throw new Error('Failed to fetch widget data');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">
          {type === "user"
            ? "USERS"
            : type === "order"
            ? "ORDERS"
            : type === "product"
            ? "PRODUCTS"
            : ""}
        </span>
        <span className="counter">{amount}</span>
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          {diff} %
        </div>
        {type === "user" && (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        )}
        {type === "order" && (
          <InventoryOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        )}
        {type === "product" && (
          <LocalMallOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Widget;
