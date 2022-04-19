import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import NotFound from "./NotFoundComponent";
import Management from "./ManagementComponent";
import Home from "./HomeComponent";
import ProductDetail from "./ProductDetailComponent";
import ProductDry from "./ProductDryFoodComponent";
import ProductDrinks from "./ProductDrinksComponent";
import ProductFresh from "./ProductFreshFoodComponent";

import Cart from "./CartComponent";

//withRouter cau hinh ket noi React voi Redux
// import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { ActionCreators } from "../redux/ActionCreators";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products,
    manageProducts: state.manageProducts,
    manageUsers: state.manageUsers,
    manageEvents: state.manageEvents,
    manageOrders: state.manageOrders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => {
    dispatch(ActionCreators.fetchProducts());
  },
  fetchManageProducts: () => {
    dispatch(ActionCreators.fetchManageProducts());
  },
  fetchManageUsers: () => {
    dispatch(ActionCreators.fetchManageUsers());
  },
  fetchManageEvents: () => {
    dispatch(ActionCreators.fetchManageEvents());
  },
  fetchManageOrders: () => {
    dispatch(ActionCreators.fetchManageOrders());
  },
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

  // fetchDepartments: () => {dispatch(fetchDepartments())},
  // fetchStaffsSalary: () => {dispatch(fetchStaffsSalary())},
  // fetchDeleteStaff: (staffId) => {dispatch(fetchDeleteStaff(staffId))},
  // postStaff: (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary) => dispatch(postStaff(name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary)),
  // putStaff: (staffId, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary) => dispatch(putStaff(staffId, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary))
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchManageProducts();
    this.props.fetchManageUsers();
    this.props.fetchManageEvents();
    this.props.fetchManageOrders();
  }

  // alertTest(value){
  //   this.props.AddCart(value,1);
  // <Route exact path="/trangchu" element={<Home products={this.props.products.products} AddCart={(value) => this.alertTest(value)}/>} />
  // }

  render() {
    const ProductWithIdAndType = () => {
      // alert(useParams().productId);
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

    return (
      <React.Fragment>
        <Header numberCart={this.props.cart.numberCart} />

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

          <Route exact path="/quanly" element={<Management manageProducts={this.props.manageProducts.products}
                                                manageUsers ={this.props.manageUsers.users}
                                                manageEvents ={this.props.manageEvents.events}
                                                manageOrders ={this.props.manageOrders.orders}/>} />

          <Route element={<NotFound />} />
        </Routes>

        <Footer />
      </React.Fragment>
    );
  }
}

// export default Main;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
