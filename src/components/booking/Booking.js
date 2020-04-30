import React, { Component } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { ToastContainer, toast } from 'react-toastify';

import { getRangeOfDates } from "../../Helpers";
import "./Booking.scss";
import moment from "moment";
import BookingModal from "./BookingModal";
import { createBooking } from "../../actions/bookingActions";

class Booking extends Component {
  state = {
    proposedBooking: {
      startAt: "",
      endAt: "",
      guests: ""
    },
    modal: {
      open: false,
    },
    errors: [],
  };

  bookedOutDates = [];
  dateRef = React.createRef();

  componentDidMount() {
    this.getBookedOutDates();
  }

  getBookedOutDates() {
    const { bookings } = this.props.rental;

    if (bookings && bookings.length > 0) {
      bookings.forEach((booking) => {
        const dateRange = getRangeOfDates(
          booking.startAt,
          booking.endAt
        );
        // console.log(dateRange);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  // prettier-ignore
  checkInvalidDates(date) {
    if (this.bookedOutDates.includes(date.format("YYYY-MM-DD")) || date.diff(moment(), "days") < 0) {
      return true;
    }
    return false
  }

  handleApply(event, picker) {
    const startAt = picker.startDate.format("YYYY-MM-DD");
    const endAt = picker.endDate.format("YYYY-MM-DD");
    this.dateRef.current.value = startAt + " to " + endAt;
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        endAt,
      },
    });
  }

  selectGuests(event) {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(event.target.value, 10),
      },
    });
  }

  cancelConfirmation() {
    this.setState({
      modal: {
        open: false,
      },
    });
  }

  confirmProposedData() {
    const { startAt, endAt } = this.state.proposedBooking;
    const days = getRangeOfDates(startAt, endAt).length - 1;
    const { rental } = this.props;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * rental.dailyRate,
        rental,
      },
      modal: {
        open: true,
      },
    });
  }

  reserveRental() {
    createBooking(this.state.proposedBooking).then(
      (booking) => {
        this.addNewBookedOutDates(booking);
        this.cancelConfirmation();
        this.resetData();
        toast.success("Booking has been succesfuly created! Enjoy.");
      },
      (errors) => {
        this.setState({errors})
      }
    )
  }

  addNewBookedOutDates(booking) {
    const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  resetData() {
    this.dateRef.current.value = "";
    this.setState({ proposedBooking: { guests: "" } });
  }

  render() {
    const { rental } = this.props;
    const { startAt, endAt, guests } = this.state.proposedBooking;

    return (
      <div className="booking">
        <ToastContainer/>
        <h3 className="booking-price">
          $ {rental.dailyRate}{" "}
          <span className="booking-per-night">per night</span>
        </h3>
        <hr></hr>
        <div className="form-group">
          <label htmlFor="dates">Dates</label>
          <DateRangePicker
            opens="left"
            containerStyles={{ display: "block" }}
            isInvalidDate={(date) => this.checkInvalidDates(date)}
            onApply={(event, picker) => this.handleApply(event, picker)}
          >
            <input
              id="dates"
              type="text"
              className="form-control"
              ref={this.dateRef}
            />
          </DateRangePicker>
        </div>
        <div className="form-group">
          <label htmlFor="guests">Guests</label>
          <input
            type="number"
            className="form-control"
            id="guests"
            value={guests}
            aria-describedby="emailHelp"
            placeholder=""
            onChange={(event) => {this.selectGuests(event)}}
          />
        </div>
        <button
          disabled={!startAt || !endAt || !guests}
          className="btn btn-bwm btn-confirm btn-block"
          onClick={() => this.confirmProposedData()}
        >
          Reserve place now
        </button>
        <hr></hr>
        <p className="booking-note-title">
          People are interested into this house
        </p>
        <p className="booking-note-text">
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal
          openModal={this.state.modal.open}
          closeModal={() => this.cancelConfirmation()}
          booking={this.state.proposedBooking}
          rentalPrice={rental.dailyRate}
          confirmModal={() => this.reserveRental()}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default Booking;
