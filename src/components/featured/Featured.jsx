import { useEffect, useState } from "react";
import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [prevMonthSales, setPrevMonthSales] = useState(0);
  const target = 50000;

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await fetch("http://localhost/pharmacy_app_api/admin/featured_data.php?type=total_sales");
        if (response.ok) {
          const data = await response.json();
          setTotalSales(data.amount);
        } else {
          throw new Error("Failed to fetch total sales data");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPrevMonthSales = async () => {
      try {
        const response = await fetch("http://localhost/pharmacy_app_api/admin/featured_data.php?type=prev_month_sales");
        if (response.ok) {
          const data = await response.json();
          setPrevMonthSales(data.amount);
        } else {
          throw new Error("Failed to fetch previous month sales data");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTotalSales();
    fetchPrevMonthSales();
  }, []);

  const percentage = Math.round((totalSales / target) * 100);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total sales made this month</p>
        <p className="amount">KShs {totalSales}</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">KShs {target}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className={`itemResult ${prevMonthSales < target ? 'negative' : 'positive'}`}>
              {prevMonthSales < target ? (
                <KeyboardArrowDownIcon fontSize="small" />
              ) : (
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
              )}
              <div className="resultAmount">KShs {prevMonthSales}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
