import SimpleDateTime  from 'react-simple-timestamp-to-date';


export const userColumns = [
  { field: "id", headerName: "UserID", width: 280 },
  {
    field: "fullName",
    headerName: "Name",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  
];

export const productColumns = [
  { field: "id", headerName: "ProductId", width: 70 },
  {
    field: "title",
    headerName: "Product",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Amount",
    width: 230,
  },

  {
    field: "timestamp",
    headerName: "UploadedON",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">       
          {/* {params.row.timestamp} */}
          <SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=':'>{params.row.timestamp}</SimpleDateTime>
        </div>
      );
    },
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];
