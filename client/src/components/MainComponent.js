import React, { Component } from "react";
import Header from "./includes/HeaderComponent";
import Footer from "./includes/FooterComponent";
import NotFound from "./pages/NotFoundComponent";
import Management from "./ManagementComponent";
import Home from "./pages/HomeComponent";
import ProductDetail from "./pages/ProductDetailComponent";
import ProductDry from "./pages/ProductDryFoodComponent";
import ProductDrinks from "./pages/ProductDrinksComponent";
import ProductFresh from "./pages/ProductFreshFoodComponent";
import OrderHistory from "./pages/OrderHistoryComponet";
import Login from "./user/LoginComponent";
import Signup from "./user/SignupComponent";
import ResetPassword from "./user/ResetPasswordComponent";
import ChangePassword from "./user/ChangePasswordComponent";

import Cart from "./pages/CartComponent";
import Order from "./pages/OrderComponent";
import UserInfo from "./pages/UserInfoComponent";

import axios from "axios";

//withRouter cau hinh ket noi React voi Redux
// import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { ActionCreators } from "../redux/ActionCreators";

/**
 * The method withRouter() config method withRouter following latest version of react router
 */
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

/**
 * The method mapStateToProps() map states from redux store to props
 */
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products,
    user: state.user,
    auth: state.auth,
    orders: state.orders,
    // manageProducts: state.manageProducts,
    // manageUsers: state.manageUsers,
    // manageEvents: state.manageEvents,
    // manageOrders: state.manageOrders,
  };
};

/**
 * The method mapDispatchToProps() map method from ActionCreators store to props's method
 */
const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => {
    dispatch(ActionCreators.fetchProducts());
  },
  fetchOrderInfo: (dataOrder) => {
    dispatch(ActionCreators.fetchOrderInfo(dataOrder));
  },

  //Login
  fetchUserLogin: (dataLogin) => {
    dispatch(ActionCreators.fetchUserLogin(dataLogin));
  },
  fetchUserLogout: (sessionId) => {
    dispatch(ActionCreators.fetchUserLogout(sessionId));
  },
  fetchEditUserInfo: (editUserInfo) => {
    dispatch(ActionCreators.fetchEditUserInfo(editUserInfo));
  },
  fetchSignupAccountInfo: (dataSignup) => {
    dispatch(ActionCreators.fetchSignupAccountInfo(dataSignup));
  },
  fetchConfirmBeforeResetPassword: (email) => {
    dispatch(ActionCreators.fetchConfirmBeforeResetPassword(email));
  },
  changeLoginStatus: (status) => {
    dispatch(ActionCreators.changeLoginStatus(status));
  },
  fetchAuthentication: (sessionId) => {
    dispatch(ActionCreators.fetchAuthentication(sessionId));
  },

  //Cart
  fetchUpdateCart: (updateCartInfo) => {
    dispatch(ActionCreators.fetchUpdateCart(updateCartInfo));
  },

  //Order
  fetchOrderHistoryWithOrderId: (orderId) => {
    dispatch(ActionCreators.fetchOrderHistoryWithOrderId(orderId));
  },

  // fetchManageProducts: () => {
  //   dispatch(ActionCreators.fetchManageProducts());
  // },
  // fetchManageUsers: () => {
  //   dispatch(ActionCreators.fetchManageUsers());
  // },
  // fetchManageEvents: () => {
  //   dispatch(ActionCreators.fetchManageEvents());
  // },
  // fetchManageOrders: () => {
  //   dispatch(ActionCreators.fetchManageOrders());
  // },
  AddCart: (product) => {
    dispatch(ActionCreators.AddCart(product));
  },
  GetNumberCart: () => {
    dispatch(ActionCreators.GetNumberCart());
  },
  UpdateCart: (product) => {
    dispatch(ActionCreators.UpdateCart(product));
  },
  DeleteCart: (product) => {
    dispatch(ActionCreators.DeleteCart(product));
  },
  IncreaseQuantity: (product) => {
    dispatch(ActionCreators.IncreaseQuantity(product));
  },
  DecreaseQuantity: (product) => {
    dispatch(ActionCreators.DecreaseQuantity(product));
  },
  UpdateUserCartToPageCart: (product) => {
    dispatch(ActionCreators.UpdateUserCartToPageCart(product));
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.props.changeLoginStatus({ status: "idle", user: null });

    // this.props.fetchAuthentication({ isLogged: false });
    // this.props.fetchManageProducts();
    // this.props.fetchManageUsers();
    // this.props.fetchManageEvents();
    // this.props.fetchManageOrders();
    // alert("componentDidMount");
  }

  // getCSRFToken = async () => {
  //   const response = await axios.get(
  //     "http://localhost:4000/client/getCSRFToken"
  //   );
  //   axios.defaults.headers.post["X-CSRF-Token"] = response.data.CSRFToken;
  // };

  componentDidUpdate() {
    // this.getCSRFToken();
    // alert(
    //   "componentDidUpdate, user: " +
    //     JSON.stringify(this.props.user.user) +
    //     "    auth: " +
    //     JSON.stringify(this.props.auth.auth) +
    //     "     Cart: " +
    //     JSON.stringify(this.props.cart.Carts)
    // );
    alert("orders Main: " + JSON.stringify(this.props.orders));

    //Tracking user loggedin or not
    if (
      this.props.user.user.status === "logged" &&
      this.props.user.user.user !== null
    ) {
      this.props.fetchAuthentication(this.props.auth.auth.sessionId);
    }

    //Update user's cart each changing cart
    if (this.props.user.user.user !== null) {
      // alert("update cart");
      if (
        !JSON.stringify(this.props.user.user.user.cart).localeCompare(
          JSON.stringify(this.props.cart.Carts)
        )
      ) {
        alert("same same");
        //Do nothing
      } else {
        //Chi fetch khi page's Cart thay doi
        alert("not same");
        const updateCartInfo = {
          Carts: this.props.cart.Carts,
          sessionId: this.props.auth.auth.sessionId,
        };
        this.props.fetchUpdateCart(updateCartInfo);
      }
    }
  }

  render() {
    const ProductWithIdAndType = () => {
      const paramId = useParams().productId;
      const paramTypeFood = useParams().typeFood;
      return (
        <ProductDetail
          product={
            this.props.products.products.filter(
              (product) => product._id === paramId
            )[0]
          }
          AddCart={this.props.AddCart}
        />
      );
    };

    const ChangePasswordWithToken = () => {
      // alert(useParams().productId);
      // <Route
      //   path="/khoiphucmatkhau/:token"
      //   element={<ChangePasswordWithToken />}
      // />;
      const token = useParams().token;
      return <ChangePassword token={token} />;
    };

    return (
      <React.Fragment>
        <Header
          numberCart={this.props.cart.numberCart}
          auth={this.props.auth}
          user={this.props.user}
          fetchUserLogout={this.props.fetchUserLogout}
          fetchAuthentication={this.props.fetchAuthentication}
        />
        {/* <NavbarHeader/> */}

        <Routes>
          <Route
            exact
            path="/trangchu"
            element={
              <Home
                products={this.props.products.products}
                AddCart={this.props.AddCart}
              />
            }
          />
          <Route
            exact
            path="/"
            element={
              <Home
                products={this.props.products.products}
                AddCart={this.props.AddCart}
              />
            }
          />
          <Route
            exact
            path="/sanpham"
            element={
              <Home
                products={this.props.products.products}
                AddCart={this.props.AddCart}
              />
            }
          />
          <Route
            exact
            path="/sanpham/thucphamkho"
            element={
              <ProductDry
                products={this.props.products.products}
                AddCart={this.props.AddCart}
              />
            }
          />
          <Route
            exact
            path="/sanpham/thucphamtuoi"
            element={
              <ProductFresh
                products={this.props.products.products}
                AddCart={this.props.AddCart}
              />
            }
          />
          <Route
            exact
            path="/sanpham/thucuong"
            element={
              <ProductDrinks
                products={this.props.products.products}
                AddCart={this.props.AddCart}
              />
            }
          />
          <Route
            path="/sanpham/:typeFood/:productId"
            element={<ProductWithIdAndType />}
          />
          <Route
            exact
            path="/giohang"
            element={
              <Cart
                cart={this.props.cart}
                products={this.props.products.products}
                IncreaseQuantity={this.props.IncreaseQuantity}
                DecreaseQuantity={this.props.DecreaseQuantity}
                DeleteCart={this.props.DeleteCart}
              />
            }
          />
          <Route
            exact
            path="/lichsu"
            element={
              <OrderHistory
                orders={this.props.orders}
                auth={this.props.auth}
                user={this.props.user}
                products={this.props.products.products}
                fetchOrderHistoryWithOrderId={
                  this.props.fetchOrderHistoryWithOrderId
                }
              />
            }
          />

          <Route
            exact
            path="/dangnhap"
            element={
              <Login
                fetchUserLogin={this.props.fetchUserLogin}
                user={this.props.user}
                changeLoginStatus={this.props.changeLoginStatus}
                fetchAuthentication={this.props.fetchAuthentication}
                UpdateUserCartToPageCart={this.props.UpdateUserCartToPageCart}
                auth={this.props.auth}
              />
            }
          />

          <Route
            exact
            path="/dangky"
            element={
              <Signup
                fetchSignupAccountInfo={this.props.fetchSignupAccountInfo}
              />
            }
          />

          <Route
            exact
            path="/khoiphucmatkhau"
            element={
              <ResetPassword
                fetchConfirmBeforeResetPassword={
                  this.props.fetchConfirmBeforeResetPassword
                }
              />
            }
          />

          <Route
            path="/khoiphucmatkhau/:token"
            element={<ChangePasswordWithToken />}
          />

          <Route
            exact
            path="/dathang"
            element={
              <Order
                cart={this.props.cart}
                products={this.props.products.products}
                fetchOrderInfo={this.props.fetchOrderInfo}
                user={this.props.user}
                auth={this.props.auth}
              />
            }
          />

          <Route
            exact
            path="/nguoidung"
            element={
              <UserInfo
                fetchEditUserInfo={this.props.fetchEditUserInfo}
                user={this.props.user}
                auth={this.props.auth}
              />
            }
          />

          {/* <Route
            exact
            path="/quanly"
            element={
              <Management
                manageProducts={this.props.manageProducts.products}
                manageUsers={this.props.manageUsers.users}
                manageEvents={this.props.manageEvents.events}
                manageOrders={this.props.manageOrders.orders}
              />
            }
          /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </React.Fragment>
    );
  }
}

// export default Main;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
