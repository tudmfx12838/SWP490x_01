import React, { Component, useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Image,
  Breadcrumb,
  Modal,
  Form,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { getAddressByZip } from "japan-address-autofill";
import getFormatDate from "../../includes/getFormatDate";
import { useNavigate, Navigate } from "react-router-dom";

// const backendPath = "http://localhost:4000";
const backendPath = "https://webbanhang-backend.herokuapp.com";

const UserInfo = (props) => {
  let navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [doB, setdoB] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  //Changing Password Modal
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  

  const [form2, setForm2] = useState({});
  const [errors2, setErrors2] = useState({});
  const setField2 = (field, value) => {
    setForm2({
      ...form2,
      [field]: value,
    });

    if (!!errors2[field]) {
      setErrors2({
        ...errors2,
        [field]: null,
      });
    }
  };

  useEffect(() => {
    // alert(JSON.stringify(props.user.user.user));
    if (props.auth.auth.isLoggedIn && props.user.user.user !== null) {
      const postcode = props.user.user.user.address.substring(1, 8);
      const address = props.user.user.user.address.substring(
        10,
        props.user.user.user.address.length
      );

      setName(props.user.user.user.name);
      setdoB(getFormatDate(props.user.user.user.doB));
      setPhoneNumber(props.user.user.user.phoneNumber);
      setPostcode(postcode);
      setAddress(address);

      var newForm = {};

      newForm.name = props.user.user.user.name;
      newForm.doB = getFormatDate(props.user.user.user.doB);
      newForm.phoneNumber = props.user.user.user.phoneNumber;
      newForm.postcode = postcode;
      newForm.address = address;

      setForm(newForm);
    }
  }, [props, props.auth.auth, props.user.user.user]);

  function validateForm() {
    // const required = (val) => val && val.length;
    const maxLength = (val, len) => !val || val.length <= len;
    const minLength = (val, len) => val && val.length >= len;
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

    const { name, doB, phoneNumber, postcode, address } = form;
    const newErrors = {};

    if (!name || name === "") {
      newErrors.name = "Xin nhập tên khách hàng!";
    } else if (isNumber(name)) {
      newErrors.name = "Xin nhập tên là ký tự chữ viết";
    } else if (!minLength(name, 2)) {
      newErrors.name = "Xin nhập tên là nhiều hơn 2 ký tự chữ viết";
    }

    if (!doB || doB === "") {
      newErrors.doB = "Xin nhập ngày sinh!";
    }

    if (!phoneNumber || phoneNumber === "") {
      newErrors.phoneNumber = "Xin nhập số điện thoại!";
    } else if (!isNumber(Number(phoneNumber))) {
      newErrors.phoneNumber = "Xin nhập số điện thoại là chữ số";
    } else if (!minLength(phoneNumber, 10)) {
      newErrors.phoneNumber = "Xin nhập số điện thoại là 10 chữ số";
    } else if (!maxLength(phoneNumber, 10)) {
      newErrors.phoneNumber = "Xin nhập số điện thoại là 10 chữ số";
    }

    if (!postcode || postcode === "") {
      newErrors.postcode = "Xin nhập mã bưu điện";
    } else if (!isNumber(Number(postcode))) {
      newErrors.postcode = "Xin nhập mã bưu điện là chữ số";
    } else if (!minLength(postcode, 7)) {
      newErrors.postcode = "Xin nhập mã bưu điện là 7 chữ số";
    } else if (!maxLength(postcode, 7)) {
      newErrors.postcode = "Xin nhập mã bưu điện là 7 chữ số";
    }

    if (!address || address === "") {
      newErrors.address = "Xin nhập địa chỉ";
    }

    return newErrors;
  }

  function handlePostCodechange(e) {
    const isSevenNumber = (val, len) => val && val.length === len;
    if (isSevenNumber(e.target.value, 7)) {
      getAddressByZip(e.target.value).then((response) => {
        let address =
          response.prefecture + " " + response.city + " " + response.area + " ";
        setAddress(address);
        setField("address", address);
      });
      setPostcode(e.target.value);
      setField("postcode", e.target.value);
      // {"region":"中国","prefecture":"広島県","city":"広島市西区","area":"庚午中"}
    }
  }

  function handleResetButton() {
    const postcode = props.user.user.user.address.substring(1, 8);
    const address = props.user.user.user.address.substring(
      10,
      props.user.user.user.address.length
    );

    setdoB(getFormatDate(props.user.user.user.doB));
    setPostcode(postcode);
    setAddress(address);
    setName(props.user.user.user.name);
    setPhoneNumber(props.user.user.user.phoneNumber);

    var newForm = {};

    newForm.name = props.user.user.user.name;
    newForm.doB = getFormatDate(props.user.user.user.doB);
    newForm.phoneNumber = props.user.user.user.phoneNumber;
    newForm.postcode = postcode;
    newForm.address = address;

    setForm(newForm);
    setErrors({});
  }

  const handleShow = (key) => {
    //show confirm modal
    setShow(true);
  };

  /**
   * The method handleDelete() implement delete a product in cart
   */
  const handleClose = () => {
    //hide confirm modal
    setShow(false);
  };

  const handleSubmit = (event) => {
    //hide confirm modal

    event.preventDefault();

    const editUserInfo = {
      sessionId: props.auth.auth.sessionId,
      // email: props.user.user.user.email,
      name: name,
      doB: doB,
      phoneNumber: phoneNumber,
      postcode: postcode,
      address: address,
    };

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      //
      setErrors(formErrors);
      //
    } else {
      props.fetchEditUserInfo(editUserInfo);
      //
      navigate("/");
      setShow(false);
    }
  };

  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    //hide confirm modal
    setShowChangePasswordModal(false);
  };

  function handleResetChangePasswordButton() {
    setOldPassword("");
    setPassword("");
    setConfirmPassword("");
    setField2({});
    setErrors2({});
    setForm2({});
  }

  function validateFormChangePassword() {
    // const required = (val) => val && val.length;
    const maxLength = (val, len) => !val || val.length <= len;
    const minLength = (val, len) => val && val.length >= len;
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

    const { oldPassword, password, confirmPassword } = form2;
    const newErrors = {};

    if (!oldPassword || oldPassword === "") {
      newErrors.oldPassword = "Xin nhập mật khẩu!";
    } else if (!minLength(oldPassword, 3)) {
      newErrors.oldPassword = "Xin nhập mật khẩu lớn hơn 3 ký tự";
    }

    if (!password || password === "") {
      newErrors.password = "Xin nhập mật khẩu!";
    } else if (!minLength(password, 3)) {
      newErrors.password = "Xin nhập mật khẩu lớn hơn 3 ký tự";
    }

    if (!confirmPassword || confirmPassword === "") {
      newErrors.confirmPassword = "Xin xác nhận mật khẩu!";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không trùng khớp";
    }

    return newErrors;
  }

  function handleSubmitChangePassword(event) {
    event.preventDefault();

    const changedpassword = {
      sessionId: props.auth.auth.sessionId,
      oldPassword: oldPassword,
      password: password,
    };

    const formErrors = validateFormChangePassword();

    if (Object.keys(formErrors).length > 0) {
      //
      setErrors2(formErrors);
      //
    } else {
      //
      fetchChangeAccountPassword(changedpassword);
      //
    }
  }

  function fetchChangeAccountPassword(changedpassword) {
    return fetch(backendPath + "/client/changeAccountPassword", {
      method: "POST",
      body: JSON.stringify(changedpassword),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((respone) => respone.json())
      .then((respone) => {
        // alert(JSON.stringify(respone));
        if (respone.isEditted) {
          alert(respone.inform);
          setShowChangePasswordModal(false);
          navigate("/");
        } else {
          alert(respone.inform);
          setShowChangePasswordModal(true);
          navigate("/nguoidung");
        }
      })
      .catch((error) => console.log(error));
  }
  if (props.user.user.user !== null && props.auth.auth.isLoggedIn) {
    // alert(
    //   "(props.auth.auth.isLoggedin " +
    //     props.auth.auth.isLoggedin +
    //     " , props.user.user.user" +
    //     JSON.stringify(props.user.user.user)
    // );
    return (
      <Container>
        <Row>
          <Breadcrumb>
            <NavLink to="/">Trang chủ </NavLink>

            <Breadcrumb.Item active>/ Thông tin người dùng</Breadcrumb.Item>
          </Breadcrumb>
        </Row>

        <Row xs={1} md={2}>
          <Col>
            <Image
              variant=""
              src={"/assets/" + props.user.user.user.imageUrl}
              alt={props.user.user.user.name}
              width={300}
              height={400}
            />
          </Col>
          <Col>
            <Card.Title>Thông Tin Người Dùng</Card.Title>
            <Card.Text>
              <b>Tên:</b> {props.user.user.user.name}
            </Card.Text>
            <Card.Text>
              <b>Ngày sinh:</b> {getFormatDate(props.user.user.user.doB)}
            </Card.Text>
            <Card.Text>
              <b>Email:</b> {props.user.user.user.email}
            </Card.Text>
            <Card.Text>
              <b>Điện thoại:</b> {props.user.user.user.phoneNumber}
            </Card.Text>
            <Card.Text>
              <b>Địa chỉ:</b> {props.user.user.user.address}
            </Card.Text>
            <Card.Text>
              <b>Tích điểm:</b> {props.user.user.user.point}
            </Card.Text>

            <Button variant="primary" onClick={handleShow}>
              Sửa
            </Button>

            <Button
              className="ml-3"
              variant="success"
              onClick={handleShowChangePasswordModal}
            >
              Đổi mật khẩu
            </Button>
          </Col>
        </Row>

        <Modal
          show={showChangePasswordModal}
          onHide={handleCloseChangePasswordModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Thay đổi mật khẩu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(event) => handleSubmitChangePassword(event)}>
            <Form.Group as={Row} className="mb-3" controlId="oldPassword">
                <Form.Label column sm={4}>
                  Mật khẩu cũ
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    className={!!errors2.oldPassword && "red-border"}
                    onChange={(event) => {
                      setField2("oldPassword", event.target.value);
                      setOldPassword(event.target.value);
                    }}
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    placeholder="Xin nhập mật khẩu cũ"
                    isInvalid={!!errors2.oldPassword}
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors2.oldPassword}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="password">
                <Form.Label column sm={4}>
                  Mật khẩu mới
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    className={!!errors2.password && "red-border"}
                    onChange={(event) => {
                      setField2("password", event.target.value);
                      setPassword(event.target.value);
                    }}
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Xin nhập mật khẩu mới"
                    isInvalid={!!errors2.password}
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors2.password}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
                <Form.Label column sm={4}>
                  Xác nhận lại
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    className={!!errors2.confirmPassword && "red-border"}
                    onChange={(event) => {
                      setField2("confirmPassword", event.target.value);
                      setConfirmPassword(event.target.value);
                    }}
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Xin xác nhận mật khẩu mới"
                    isInvalid={!!errors2.confirmPassword}
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors2.confirmPassword}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 3 }}>
                  <Button type="submit">Đổi mật khẩu</Button>
                  <Button
                    type="button"
                    className="btn btn-success ml-2"
                    onClick={() => {
                      handleResetChangePasswordButton();
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-danger ml-2"
                    onClick={() => {
                      handleResetChangePasswordButton();
                      handleCloseChangePasswordModal();
                    }}
                  >
                    Hủy
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="primary" onClick={handleEdit}>
              Thay đổi
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
          </Modal.Footer> */}
        </Modal>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Sửa Thông Tin Người Dùng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(event) => handleSubmit(event)}>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm={3}>
                  Tên
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className={!!errors.name && "red-border"}
                    onChange={(event) => {
                      setField("name", event.target.value);
                      setName(event.target.value);
                    }}
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Xin nhập Tên Khách Hàng đăng ký"
                    isInvalid={!!errors.name}
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="doB">
                <Form.Label column sm={3}>
                  Ngày sinh
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className={!!errors.doB && "red-border"}
                    onChange={(event) => {
                      setField("doB", event.target.value);
                      setdoB(event.target.value);
                    }}
                    type="date"
                    name="doB"
                    value={doB}
                    placeholder=""
                    isInvalid={!!errors.doB}
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.doB}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="phoneNumber">
                <Form.Label column sm={3}>
                  Điện thoại
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className={!!errors.phoneNumber && "red-border"}
                    onChange={(event) => {
                      setField("phoneNumber", event.target.value);
                      setPhoneNumber(event.target.value);
                    }}
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    placeholder="Số điện thoại 10 chữ số"
                    isInvalid={!!errors.phoneNumber}
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phoneNumber}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="postcode">
                <Form.Label column sm={3}>
                  Mã bưu điện
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className={!!errors.postcode && "red-border"}
                    onBlur={(e) => {
                      handlePostCodechange(e);
                    }}
                    onKeyDown={(e) => {
                      handlePostCodechange(e);
                    }}
                    onChange={(event) => {
                      setField("postcode", event.target.value);
                      setPostcode(event.target.value);
                    }}
                    type="text"
                    name="postcode"
                    value={postcode}
                    placeholder="Mã bưu điện 7 chữ số"
                    isInvalid={!!errors.postcode}
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.postcode}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="address">
                <Form.Label column sm={3}>
                  Địa chỉ
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    className={!!errors.address && "red-border"}
                    onChange={(event) => {
                      setField("address", event.target.value);
                      setAddress(event.target.value);
                    }}
                    type="text"
                    name="address"
                    value={address}
                    placeholder="Xin nhập địa chỉ"
                    isInvalid={!!errors.address}
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 3 }}>
                  <Button type="submit">Thay đổi</Button>
                  <Button
                    type="button"
                    className="btn btn-success ml-2"
                    onClick={() => {
                      handleResetButton();
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-danger ml-2"
                    onClick={() => {
                      // handleResetButton();
                      handleClose();
                    }}
                  >
                    Hủy
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="primary" onClick={handleEdit}>
              Thay đổi
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
          </Modal.Footer> */}
        </Modal>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <h1>Vui lòng đăng nhập!</h1>
        </Row>
      </Container>
    );
  }
};

export default UserInfo;
