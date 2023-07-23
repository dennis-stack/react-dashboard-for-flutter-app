import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import NewUserForm from "../../pages/new/New";

const UserDatatable = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/pharmacy_app_api/admin/get_users.php');
        const userList = await response.json();
        setData(userList);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost/pharmacy_app_api/admin/delete_user.php?id=${id}`);
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

  const userColumns = [
    { field: "id", headerName: "ID"},
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <PersonIcon /> {params.row.firstName} {params.row.lastName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNo", headerName: "PhoneNo", width: 200 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton">View</div>
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

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Users
        <button className="link" onClick={toggleForm}>
          <div className="link-text">Add New User</div>
        </button>
      </div>
      {showForm && (
        <div className="floatingForm">
          <NewUserForm />
        </div>
      )}
      <div className={`datagrid ${showForm ? "blur" : ""}`}>
        <DataGrid
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default UserDatatable;
