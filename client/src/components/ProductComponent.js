import React, { Component, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";

function RenderProduct({ data, columns }) {
  const CaptionElement = () => (
    <h3
      style={{
        borderRadius: "0.25em",
        textAlign: "center",
        color: "purple",
        border: "1px solid purple",
        padding: "0.5em",
      }}
    >
      Component as Header
    </h3>
  );
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];
  return (
    <>
      <h1>ProductManagement</h1>

      <div className="container">
        <div style={{ marginTop: 20 }}>
          <BootstrapTable
            bootstrap4
            striped
            hover
            keyField="title"
            data={data}
            columns={columns}
            caption={<CaptionElement />}
            selectRow={{ mode: "checkbox" }}
            defaultSorted={defaultSorted}
            tabIndexCell
          />
        </div>
      </div>
    </>
  );
}

const Product = (props) => {
    const [productDataAndCol, setProductDataAndCol] = useState({
        products: [],
        columns: [
          {
            dataField: "Id",
            text: "Id",
          },
          {
            dataField: "title",
            text: "Name",
            sort: true,
          },
          {
            dataField: "price",
            text: "Price",
            sort: true,
          },
          {
            dataField: "description",
            text: "description",
            sort: true,
          },
          {
            dataField: "mount",
            text: "Mount",
            sort: true,
          },
        ],
      });

  
      return(
        <RenderProduct data={props.products} columns={productDataAndCol.columns}/>
      )
}

export default Product;
