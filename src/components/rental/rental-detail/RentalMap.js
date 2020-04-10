import React from "react";
import GoogleMapComponent from "../../map/GoogleMapComponent";
import { useLoadScript } from "@react-google-maps/api";

function RentalMap(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCYgvBfzNPPwVK6gFXX6UrJTIH6_c5PKGM", // ,
    // ...otherOptions
  });
  

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? <GoogleMapComponent location={props.location} /> : "Loading...";
}

export default RentalMap;
