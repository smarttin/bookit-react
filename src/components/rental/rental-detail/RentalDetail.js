import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchRentalById } from '../../../actions';


class RentalDetail extends Component {

  componentDidMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(fetchRentalById(rentalId));
  }
  
  render() {
    const rental = this.props.rental;
    if (rental.id) {
      return (
        <div>
          <h1>{rental.title}</h1>
          <h1>{rental.dailyRate}$</h1>
        </div>
      )
    } else {
      return <p>Loading...</p>
    }
  }
}

const mapStateToProps = state => {
  return {
    rental: state.rental.rental
  }
}

export default connect(mapStateToProps)(RentalDetail);
