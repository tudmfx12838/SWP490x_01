import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import UserMangement from "./UserMangementComponent";

class Main extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <React.Fragment>
                <Header/>
                <UserMangement/>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default Main;