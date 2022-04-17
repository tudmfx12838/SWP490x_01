import React, { Component, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import { Form } from "react-bootstrap";
import axios from "axios";

import { cartData } from "../shared/carts";

function RenderCart({ data, columns }) {}

const key = cartData.map((el) => el.id);

const Cart = (props) => {
  const [products, setProducts] = useState(cartData); // transformers products
  const [open, setOpen] = useState(false); // control for adding diaglog
  const [state, setState] = useState({
    row: null,
    state: null,
    oldValue: null,
  });

  //Refer
  const entry = {
    id: null,
    area: null,
    rating: null,
    voltage: null,
    lat: null,
    Long: null,
  };

  // hide checkbox for selection
  const selectRowProp = {
    mode: "checkbox",
    hideSelectColumn: true,
  };

  const numberValidator = (newValue, row, column) => {
    if (isNaN(newValue)) {
      return {
        valid: false,
        message: "This field should be numeric",
      };
    }
    return true;
  };

  const cartTableColumns = [
    {
      dataField: "_id",
      text: "Mã SP",
      editable: false,
    },
    {
      dataField: "title",
      text: "Tên sản phẩm",
      sort: true,
      editable: false,
    },
    {
      dataField: "mount",
      text: "Số lượng",
      type: "number",
      validator: numberValidator,
      sort: true,
      editable: true,
    },
    {
      dataField: "price",
      text: "Đơn giá",
      sort: true,
      editable: false,
    },
    {
      dataField: "total",
      text: "Thành tiền",
      sort: true,
      editable: false,
    },
    {
      dataField: "action",
      text: "Hành động",
      sort: true,
      editable: false,
      isDummyField: true,
      formatExtraData: state,
      formatter: (cellContent, row) => {
        if (row.state)
          return (
            <div>
              <button
                className="btn btn-secondary btn-xs"
                onClick={() => {
                  setState((prev) => {
                    row.state = null;
                    let newState = { ...prev, state: row.state, row: null };
                    return newState;
                  });
                }}
              >
                  Lưu
              </button>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  setProducts((prev) => {
                    let newVal = prev.map((el) => {
                      if (el._id === row._id) {
                        return state.oldValue;
                      }
                      return el;
                    });
                    return newVal;
                  });
                  setState((prev) => {
                    row.state = null;
                    let newState = { ...prev, state: row.state, row: null };
                    return newState;
                  });
                }}
              >
                Hủy
              </button>
            </div>
          );
        else
          return (
            <div>
              <button
                className="btn btn-danger btn-xs"
                onClick={() => handleDelete(row._id)}
              >
                {/* <DeleteIcon /> */}
                Xóa
              </button>
            </div>
          );
      },
    },
  ];

  // a function to save the old value
  const handleStartEdit = (row) => {
    setState((prev) => {
      let newVal = { ...prev, oldValue: { ...row } };
      return newVal;
    });
  };

  //  delected the selected row
  const handleDelete = (rowId) => {
    setProducts(products.filter((el) => el._id !== rowId));
  };

  const handleCancelAdd = () => {
    setOpen(false);
  };

  const handleSaveAdd = (tlmId) => {
    // check duplicated id
    if (products.filter((el) => el.id === tlmId).length) {
      // the same id is entered
      alert("the id you have entered is already taken!");
    } else {
      setProducts((prev) => {
        let newEntry = { ...entry, id: tlmId };
        let newVal = [newEntry, ...prev];
        return newVal;
      });
      setOpen(false);
    }
  };

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
      Danh sách sản phẩm trong giỏ hàng
    </h3>
  );
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  const selectRow = {
    mode: "checkbox", // multi select
    clickToSelect: true,
    // bgColor: '#fefefe',
    // clickToSelectAndEditCell: true,
  };
  const cellEdit = {
    mode: "dbclick",
    blurToSave: true,
    onStartEdit: (row, column, rowIndex, columnIndex) => {
      console.log("start to edit!!!");
      if (row.state !== "edited") {
        console.log(row.state);
        handleStartEdit(row);
      }
    },
    beforeSaveCell: (oldValue, newValue, row, column) => {
      console.log("Before Saving Cell!!");
    },
    afterSaveCell: (oldValue, newValue, row, column) => {
      console.log("After Saving Cell!!");
      if (oldValue !== newValue) {
        row.state = "edited";
        setState({ ...state, row: row, state: row.state });
      }
    },
    nonEditableRows: () =>
      state.row ? key.filter((el) => el !== state.row._id) : [],
  };
  return (
    <>
      <div className="container">
        <div style={{ marginTop: 20 }}>
          <BootstrapTable
            bootstrap4
            // striped
            hover
            keyField="_id"
            data={products}
            columns={cartTableColumns}
            caption={<CaptionElement />}
            selectRow={selectRowProp}
            cellEdit={cellEditFactory(cellEdit)}
            // defaultSorted={defaultSorted}
            // tabIndexCell
            // filter={ filterFactory() }
            // pagination={ paginationFactory() }
          />
        </div>
      </div>
    </>
  );
};

export default Cart;
