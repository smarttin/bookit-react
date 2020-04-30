import React, {Component} from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./App.scss";
import Header from "./components/shared/Header";
import RentalListing from "./components/rental/rental-list/RentalListing";
import RentalSearchListing from "./components/rental/rental-list/RentalSearchListing";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import { RentalCreate } from "./components/rental/rental-create/RentalCreate";
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
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/rentals' />}  />
              <Route exact path='/rentals' component={RentalListing} />
              <Route exact path='/rentals/:city/homes' component={RentalSearchListing} />
              <ProtectedRoute exact path='/rentals/new' component={RentalCreate} />
              <ProtectedRoute exact path='/rentals/:id' component={RentalDetail} />
              <LoggedInRoute exact path='/login' component={Login} />
              <LoggedInRoute exact path='/register' component={Register} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
