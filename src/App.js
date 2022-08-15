import React, {useEffect }from "react";
import Main from "./components/MainComponent";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from './redux/configureStore';
import ReactGA from 'react-ga';
const TRACKING_ID = "G-M8Q7W3FESF"; 

ReactGA.initialize(TRACKING_ID);

const store = ConfigureStore();

const App = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
 
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
  
}

export default App;
