import React from "react";
import { Modal } from "react-responsive-modal";
import { Error } from "../shared/form/Error";
import "./Booking.scss";

export default function BookingModal({ openModal, closeModal, booking, rentalPrice, confirmModal, errors }) {
  return (
    <Modal open={openModal} onClose={closeModal} little classNames={{ modal: 'booking-modal' }}>
      <h4 className='modal-title title'>Confirm Booking </h4>
        <p className='dates'>{booking.startAt} / {booking.endAt}</p>
        <div className='modal-body'>
          <em>{booking.days}</em> nights / <em>{rentalPrice}$</em> per Night
          <p>Guests: <em>{booking.guests}</em></p>
          <p>Price: <em>{booking.totalPrice}$ </em></p>
            <p>Do you confirm your booking for selected days?</p>
          </div>
        <Error errors={errors}/>
      <div className='modal-footer'>
        <button type='button' className='btn btn-bwm' onClick={confirmModal}>Confirm</button>
        <button type='button' onClick={closeModal} className='btn btn-bwm'>Cancel</button>
      </div>
    </Modal>
  );
}
