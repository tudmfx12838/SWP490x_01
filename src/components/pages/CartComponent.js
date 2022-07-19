import React, { Component, useState } from "react";
import {
  Container,
  Row,
  Table,
  Image,
  Button,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Cart = (props) => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [storeKey, setStoreKey] = useState(null);

  const [showRequestRemoveProducts, setShowRequestRemoveProducts] =
    useState(false);
  const [inform, setInform] = useState({});
  const [storeRemoveKey, setStoreRemoveKey] = useState([]);

  /**
   * The method handleClose() implement closing confirm delete a product in cart
   */
  const handleClose = () => {
    //hide confirm modal
    setShow(false);

    //store product's info by null(nothing to delete)
    setStoreKey(null);
  };

  /**
   * The method handleShow() implement showing confirm before delete a product in cart
   */
  const handleShow = (key) => {
    //show confirm modal
    setShow(true);
    //store product's info that want to delete
    setStoreKey(key);
  };

  /**
   * The method handleDelete() implement delete a product in cart
   */
  const handleDelete = () => {
    //hide confirm modal
    setShow(false);

    /**
     * The method DeleteCart() implement delete a product by stored product's info in cart
     */
    props.DeleteCart(storeKey);

    //store product's info by null(nothing to delete) atfer delete a product
    setStoreKey(null);
  };

  let ListCart = [];
  let TotalCart = 0;

  //Create a List cart for showing
  Object.keys(props.cart.Carts).forEach(function (item) {
    TotalCart += props.cart.Carts[item].quantity * props.cart.Carts[item].price;
    ListCart.push(props.cart.Carts[item]);
  });

  var checkingInvalidProductInCart = (products, listProducts) => {
    const ListCartInfo = listProducts.map((listProduct, key) => {
      // let result = {};
      const getProductInfo = products.filter(
        (product) => product._id === listProduct._id
      )[0];

      return {
        _id: getProductInfo._id,
        title: getProductInfo.title,
        mount: getProductInfo.mount,
        available: getProductInfo.available,
        key: key,
      };
    });

    return ListCartInfo;
  };

  /**
   * The method handleShow() implement showing confirm before delete a product in cart
   */
  const handleConfirmOrder = (key) => {
    // var inform = "Không thể tiến hành đặt hàng vì: \n";
    const ListCartInfo = checkingInvalidProductInCart(props.products, ListCart);

    var isValid = true;
    var productSoldOut = "";
    var productDeactive = "";
    var listKey = [];

    for (let i = 0; i <= ListCartInfo.length - 1; i++) {
      if (ListCartInfo[i].available === false) {
        productDeactive += ListCartInfo[i].title + ", ";
        isValid = false;

        listKey.push(ListCartInfo[i].key);
      } else if (ListCartInfo[i].mount <= 0) {
        productSoldOut += ListCartInfo[i].title + ", ";
        isValid = false;

        listKey.push(ListCartInfo[i].key);
      } else {
        //Do nothing
      }
    }

    productDeactive =
      productDeactive !== ""
        ? "Sản phẩm: " + productDeactive + " đã ngừng kinh doanh."
        : "";

    productSoldOut =
      productSoldOut !== ""
        ? "Sản phẩm: " + productSoldOut + " đã hết hàng."
        : "";

    const inform = {
      productDeactive: productDeactive,
      productSoldOut: productSoldOut,
    };

    if (!isValid) {
      setStoreRemoveKey(listKey);
      setInform(inform);
      setShowRequestRemoveProducts(true);
    } else {
      navigate("/dathang");
    }
  };

  /**
   * The method handleClose() implement closing confirm delete a product in cart
   */
  const handleClose2 = () => {
    //hide confirm modal
    setShowRequestRemoveProducts(false);
    //store product's info by null(nothing to delete)
    setStoreRemoveKey([]);

    setInform({});
  };

  /**
   * The method handleDelete() implement delete a product in cart
   */
  const handleRequestRemoveProduct = () => {
    //hide confirm modal
    setShowRequestRemoveProducts(false);

    /**
     * The method DeleteCart() implement delete a product by stored product's info in cart
     */
    //Delet shift
    for (let i = 0; i <= storeRemoveKey.length - 1; i++) {
      storeRemoveKey[i] = storeRemoveKey[i] - i;
    }
    storeRemoveKey.forEach((key) => {
      props.DeleteCart(key);
    });

    setStoreRemoveKey([]);

    setInform({});
  };

  /**
   * The method TotalPrice() caculate total of price
   * @param price is product's price
   * @param quantity is number of product in cart
   */
  function TotalPrice(price, quantity) {
    return Number(price * quantity).toLocaleString("en-US");
  }

  //Show cart if it's not null and show inform as empty if nothing in cart
  if (ListCart.length > 0) {
    return (
      <Container>
        <Row className="col-md-12">
          <Table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {ListCart.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <Button variant="danger" onClick={() => handleShow(key)}>
                        X
                      </Button>
                    </td>
                    <td>{item.title}</td>
                    <td>
                      <Image
                        src={"/assets/" + item.imageUrl}
                        style={{ width: "100px", height: "80px" }}
                      />
                    </td>
                    <td>{item.price} ￥</td>
                    <td>
                      <Button
                        variant="primary"
                        style={{ margin: "2px" }}
                        onClick={() => props.DecreaseQuantity(key)}
                      >
                        -
                      </Button>
                      <span className="btn btn-outline-info">
                        {item.quantity}
                      </span>
                      <Button
                        variant="primary"
                        style={{ margin: "2px" }}
                        onClick={() => props.IncreaseQuantity(key)}
                      >
                        +
                      </Button>
                    </td>
                    <td>{TotalPrice(item.price, item.quantity)} ￥</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="5">Tổng</td>
                <td>{Number(TotalCart).toLocaleString("en-US")} ￥</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          {/* <Link as={NavLink} className="btn btn-primary" to="/dathang">
            Xác nhận đơn hàng
          </Link> */}
          <Button
            variant="primary"
            className="btn btn-primary"
            onClick={handleConfirmOrder}
          >
            Xác nhận đơn hàng
          </Button>
        </Row>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận tác vụ xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleDelete}>
              Có
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Không
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showRequestRemoveProducts}
          onHide={handleClose2}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận giỏ hàng không thành công</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{inform.productDeactive}</p>
            <p>{inform.productSoldOut}</p>

            {/* <h4>Bạn có muốn xóa các sản phẩm này khỏi giỏ hàng?</h4> */}
            <h4>Xin gỡ các sản phẩm này trước khi xác nhận giỏ hàng!</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleRequestRemoveProduct}>
              Có
            </Button>
            <Button variant="secondary" onClick={handleClose2}>
              Không
            </Button>
            {/* <Button variant="secondary" onClick={handleClose2}>
              Hủy
            </Button> */}
          </Modal.Footer>
        </Modal>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <h1>Giỏ hàng trống!</h1>
        </Row>
      </Container>
    );
  }
};

export default Cart;
