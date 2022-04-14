import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import UserMangement from "./UserMangementComponent";
import Product from "./ProductComponent";
import NotFound from "./NotFoundComponent";
import Management from "./ManagementComponent";

//withRouter cau hinh ket noi React voi Redux
// import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';

import { ActionCreators } from '../redux/ActionCreators';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

const mapStateToProps = state => {
  return {
    products: state.products,
    manageProducts: state.manageProducts,
    manageUsers: state.manageUsers,
    manageEvents: state.manageEvents,
    manageOrders: state.manageOrders
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => {dispatch(ActionCreators.fetchProducts())},
  fetchManageProducts: () => {dispatch(ActionCreators.fetchManageProducts())},
  fetchManageUsers: () => {dispatch(ActionCreators.fetchManageUsers())},
  fetchManageEvents: () => {dispatch(ActionCreators.fetchManageEvents())},
  fetchManageOrders: () => {dispatch(ActionCreators.fetchManageOrders())},
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

  componentDidMount(){
    this.props.fetchProducts();
    this.props.fetchManageProducts();
    this.props.fetchManageUsers();
    this.props.fetchManageEvents();
    this.props.fetchManageOrders();
  }

  render() {
    return (
      <React.Fragment>
        <Header />

        <Routes>
          <Route exact path="/" element={<Product products={this.props.products.products}/>} />
          <Route exact path="/quanly" element={<Management manageProducts={this.props.manageProducts.products}
                                                manageUsers ={this.props.manageUsers.users}
                                                manageEvents ={this.props.manageEvents.events}
                                                manageOrders ={this.props.manageOrders.orders}/>} />
          <Route exact path="/sanpham" element={<Product  products={this.props.products.products}/>} />
          <Route exact path="/quanlynguoidung" element={<UserMangement />} />
          <Route element={<NotFound />} />
        </Routes>

        <Footer />
      </React.Fragment>
    );
  }
}

// export default Main;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
