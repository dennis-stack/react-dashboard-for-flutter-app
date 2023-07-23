import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchCounts = async () => {
      try {
        const responseUser = await fetch('http://localhost/pharmacy_app_api/admin/widget_data.php?type=user');
        const userData = await responseUser.json();
        if (isMounted) {
          setUserCount(userData.amount);
        }
    
        const responseProduct = await fetch('http://localhost/pharmacy_app_api/admin/widget_data.php?type=product');
        const productData = await responseProduct.json();
        if (isMounted) {
          setProductCount(productData.amount);
        }
    
        const responseOrder = await fetch('http://localhost/pharmacy_app_api/admin/widget_data.php?type=order');
        const orderData = await responseOrder.json();
        if (isMounted) {
          setOrderCount(orderData.amount);
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    
    fetchCounts();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" count={userCount} />
          <Widget type="product" count={productCount} />
          <Widget type="order" count={orderCount} />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Orders</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
