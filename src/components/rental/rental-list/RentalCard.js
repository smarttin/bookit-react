import React from "react";
import './RentalCard.scss';
import { Link } from "react-router-dom";

export default function RentalCard(props) {
  const { id, title, city, category, image, dailyRate, shared } = props.rental;
  return (
    <div className="col-md-3 col-xs-6">
      <Link className="rental-detail-link" to={`/rentals/${id}`}>
        <div className="card bwm-card">
          <img className="card-img-top" src={image} alt={title}/>
          <div className="card-block">
            <h6 className={`card-subtitle ${category}`}>{shared ? 'Shared' : 'whole'} {category} &#183; {city}</h6>
            <h4 className="card-title">{title}</h4>
            <p className="card-text">${dailyRate} per Night &#183; Free Cancelation</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
