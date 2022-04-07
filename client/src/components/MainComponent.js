import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";

class Main extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <React.Fragment>
                <Header/>
                <h2>Body</h2>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default Main;