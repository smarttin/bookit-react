import React from "react";
import "./Header.scss";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import RentalSearchInput from "../rental/rental-list/RentalSearchInput";

class Header extends React.Component {
  handleLogout() {
    this.props.logout();
    this.props.history.push('/rentals');
  }

  renderAuthButtons(isAuth) {
    if (isAuth) {
      return <Link to="/#" className='nav-link nav-item' onClick={() => this.handleLogout()}>Logout</Link>
    }

    return (
      <React.Fragment>
        <Link className='nav-item nav-link' to='/login'>Login <span className='sr-only'>(current)</span></Link>
        <Link className='nav-item nav-link' to='/register'>Register</Link>
      </React.Fragment>
    )
  }

  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <Link to="/#" className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Owner Section
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to="/rentals/new">Create Rental</Link>
            <Link className="dropdown-item" to="/rentals/manage">Manage Rentals</Link>
            <Link className="dropdown-item" to="/bookings/manage">Manage Bookings</Link>
          </div>
        </div>
      )
    }
  }
  
  render() {
    const { isAuth, username } = this.props.auth;
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-md">
        <div className="container">
          <Link className="navbar-brand" to="/rentals">
            BookiT
          </Link>
          <RentalSearchInput/>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav ml-auto">
            { isAuth &&
              <Link to="/#" className='nav-item nav-link'>{username}</Link>
            }
            {this.renderOwnerSection(isAuth)}
            {this.renderAuthButtons(isAuth)}
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(Header));
