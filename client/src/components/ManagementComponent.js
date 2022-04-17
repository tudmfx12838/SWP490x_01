import React, { Component, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';  
import paginationFactory from 'react-bootstrap-table2-paginator';  
import { Form } from "react-bootstrap";
import axios from "axios";

import { productTableColumns } from "../shared/defineColums";


function RenderManagement({ data, columns }) {
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

  const options = {  
    page: 2,   
    sizePerPageList: [ {  
      text: '5', value: 5  
    }, {  
      text: '10', value: 10  
    }, {  
      text: 'All', value: data.length  
    } ],   
    sizePerPage: 5,   
    pageStartIndex: 0,   
    paginationSize: 3,    
    prePage: 'Prev',   
    nextPage: 'Next',   
    firstPage: 'First',   
    lastPage: 'Last',   
  };

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
            filter={ filterFactory() }
            pagination={ paginationFactory() }
            insertRow
            deleteRow
          />
        </div>
      </div>
    </>
  );
}

const Management = (props) => {
  const [type, setType] = useState("products");

  const [manageDataAndCol, setManageDataAndCol] = useState({
    data: props.manageProducts,
    column: productTableColumns,
  });

  const data = props.manageProducts;

  return (
    <>
      <Form.Group controlId="formBasicSelect">
        <Form.Label>Chọn Mục Quản Lý</Form.Label>
        <Form.Control
          as="select"
          value={type}
          onChange={(e) => {
            console.log("e.target.value", e.target.value);
            setType(e.target.value);
          }}
        >
          <option value="product">Sản phẩm</option>
          <option value="user">Người dùng</option>
          <option value="event">Sự kiện</option>
          <option value="order">Đơn hàng</option>
        </Form.Control>
      </Form.Group>
      <h1>{type}</h1>
      <RenderManagement data={data} columns={manageDataAndCol.column} />
    </>
  );
};

export default Management;
