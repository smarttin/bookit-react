import React, {Component} from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "./App.scss";
import Header from "./components/shared/Header";
import RentalListing from "./components/rental/rental-list/RentalListing";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import { Provider } from "react-redux";
import store from './store';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { checkAuthState, logout } from "./actions/authActions";
import { ProtectedRoute } from "./components/shared/auth/ProtectedRoute";
import { LoggedInRoute } from "./components/shared/auth/LoggedInRoute";

class App extends Component {
  componentDidMount() {
    store.dispatch(checkAuthState())
  }

  logout() {
    store.dispatch(logout())
  }
  
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header logout={this.logout} />
          <div className="container">
            <Route exact path='/' render={() => <Redirect to='/rentals' />}  />
            <Route exact path='/rentals' component={RentalListing} />
            <ProtectedRoute exact path='/rentals/:id' component={RentalDetail} />
            <LoggedInRoute exact path='/login' component={Login} />
            <LoggedInRoute exact path='/register' component={Register} />
          </div>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
