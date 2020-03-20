import React, { Component } from "react";
import RentalList from "./RentalList";
import { connect } from "react-redux";
import { fetchRentals } from "../../../actions";


class RentalListing extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRentals());
  }

  render() {
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
        <RentalList rentals={this.props.rentals} />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    rentals: state.rental.rentals
  }
}

export default connect(mapStateToProps)(RentalListing);