import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "App.scss";
import { Header } from "shared/Header";
import RentalListing from "./components/rental/rental-list/RentalListing";
import RentalDetail from "components/rental/rental-detail/RentalDetail";
import { Provider } from "react-redux";
import store from 'store';

function App() {
  
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container">
          <Route exact path='/' render={() => <Redirect to='/rentals' />}  />
          <Route exact path='/rentals' component={RentalListing} />
          <Route exact path='/rentals/:id' component={RentalDetail} />
        </div>
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
