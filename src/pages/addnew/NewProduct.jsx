import "./newproduct.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductNew = () => {
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isMlAmountVisible, setIsMlAmountVisible] = useState(false);
  const [mlAmount, setMlAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (
      !file ||
      productName.trim() === "" ||
      productType === "" ||
      price.trim() === "" ||
      description === "" ||
      quantity.trim() === ""
    ) {
      toast.error("Please fill in all the required fields");
      return;
    }

    // Prepare the form data to be sent to the backend
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productName", productName);
    formData.append("productType", productType);
    formData.append("price", price);
    formData.append(
      "description",
      isMlAmountVisible ? `${mlAmount} ml, Price` : description
    );
    formData.append("quantity", quantity);

    try {
      const response = await fetch(
        "http://localhost/pharmacy_app_api/admin/add_product.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setFile(null);
        setProductName("");
        setProductType("");
        setPrice("");
        setDescription("");
        setQuantity("");
        setIsMlAmountVisible(false);
        setMlAmount("");
        toast.success("Product added successfully!");
      } else {
        console.error("Error adding new product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };


  const handleDescriptionChange = (e) => {
    const selectedDescription = e.target.value;
    setDescription(selectedDescription);

    if (selectedDescription === "ml, Price") {
      setIsMlAmountVisible(true);
    } else {
      setIsMlAmountVisible(false);
      setMlAmount("");
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Product Name</label>
                <input
                  type="text"
                  value={productName}
                  placeholder="Product Name"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Product Type</label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="Painkiller">Painkiller</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Antibiotic">Antibiotic</option>
                </select>
              </div>
              <div className="formInput">
                <label>Description</label>
                <select
                  value={description}
                  onChange={handleDescriptionChange}
                >
                  <option value="">Select Description</option>
                  <option value="1box, PricePerBox">1 box, Price per Box</option>
                  <option value="ml, Price">ml, Price</option>
                </select>
                {isMlAmountVisible && (
                  <input
                    type="text"
                    value={mlAmount}
                    placeholder="Amount in ml"
                    onChange={(e) => setMlAmount(e.target.value)}
                  />
                )}
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <button type="submit">Add</button>
              <ToastContainer className={"toast"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNew;
