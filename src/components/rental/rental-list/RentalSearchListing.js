import React, { Component } from "react";
import { connect } from 'react-redux';

import RentalList from './RentalList';
import { fetchRentals } from "../../../actions/rentalActions";
import { toUppercase } from "../../../Helpers";

class RentalSearchListing extends Component {
  state = {
    searchedCity: ''
  }

  componentDidMount() {
    this.searchRentalsByCity()
  }

  componentDidUpdate(prevProps) {
    const currentUrlParam = this.props.match.params.city;
    const prevUrlParam = prevProps.match.params.city;

    if (currentUrlParam !== prevUrlParam) {
      this.searchRentalsByCity();
    }
  }

  searchRentalsByCity() {
    const searchedCity = this.props.match.params.city;
    this.setState({searchedCity});
    this.props.dispatch(fetchRentals(searchedCity));
  }

  renderTitle() {
    const { errors, rentals } = this.props.rentalProp;
    const { searchedCity } = this.state;
    let title = '';
    // console.log(errors);
    if (errors.length > 0) {
      title = errors[0].detail;
    }
    if (rentals.length > 0) {
      title = `Your Home in City of ${toUppercase(searchedCity)}`;
    }

    return <h1 className="page-title">{title}</h1>
  }
  
  render() {
    const { rentals } = this.props.rentalProp
    return (
      <section id="rentalListing">
        {this.renderTitle()}
        <RentalList rentals={rentals} />
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    rentalProp: state.rental
  }
}

export default connect(mapStateToProps)(RentalSearchListing);