import React, { Component } from "react";
import { connect } from "react-redux";

import RentalList from "./RentalList";
import { fetchRentals } from "../../../actions/rentalActions";


class RentalListing extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRentals());
  }
  
  render() {
    const { rentals } = this.props.rentals // check for errors and add loading spinner
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
        <RentalList rentals={rentals} />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    rentals: state.rental
  }
}

export default connect(mapStateToProps)(RentalListing);