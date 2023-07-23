import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, useRef } from "react";
import NewProductForm from "../../pages/addnew/NewProduct";
import EditProductForm from "../../pages/editProduct/EditProduct";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/pharmacy_app_api/admin/get_products.php');
        const productList = await response.json();
        const formattedProductList = productList.map((product) => {
          return {
            ...product,
            Price: `KShs ${product.Price}`,
          };
        });
        setData(formattedProductList);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost/pharmacy_app_api/admin/delete_product.php?id=${id}`);
      const result = await response.json();
      if (result.success) {
        setData(data.filter((item) => item.id !== id));
        console.log(result.message);
      } else {
        console.log(result.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowForm(false);
      setShowEditForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const productColumns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "productImage",
      headerName: "Product Image",
      width: 120,
      renderCell: (params) => {
        return (
          <img
            src={params.value}
            alt="Product"
            style={{ width: "30px", height: "auto" }}
          />
        );
      },
    },
    { field: "productName", headerName: "Product Name", width: 200 },
    { field: "productType", headerName: "Product Type", width: 150 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "description", headerName: "Description", width: 150 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button className="editButton" onClick={toggleEditForm}>Edit</button>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Products
        <button className="link" onClick={toggleForm}>
          Add New Product
        </button>
      </div>
      {(showForm || showEditForm) && (
        <div className="floatingForm" ref={formRef}>
          {showForm && <NewProductForm />}
          {showEditForm && <EditProductForm />}
        </div>
      )}
      <DataGrid
        className="datagrid"
        rows={data}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
