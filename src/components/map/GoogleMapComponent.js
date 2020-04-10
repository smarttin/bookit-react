import React, { useState, useEffect } from "react";
import { GoogleMap, Circle, InfoWindow } from "@react-google-maps/api";
import cacher from "../../services/Cacher";

const options = {
  strokeColor: "#61dafb",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#61dafb",
  fillOpacity: 0.4,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 800,
  zIndex: 1,
};

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};


export default function GoogleMapComponent(props) {
  const [coordinates, setCoordintes] = useState({ lat: 0, lng: 0 });
  const [isError, setisError] = useState(false);
  const [isLocationLoaded, setisLocationLoaded] = useState(false);

  useEffect(() => {
    const location = props.location;
    function getGeoLocation() {
      getGeocode(location);
    }
    getGeoLocation();
    // return () => { cleanup }
  }, [props.location]);

  function getGeocode(location) {
    // if location is cached, return cached values
    if (cacher.isValueCached(location)) {
      // console.log(cacher.getCachedValue(location));
      setCoordintes(cacher.getCachedValue(location));
      setisLocationLoaded(true);
      return;
    }
    try {
      const geocoder = new window.google.maps.Geocoder();
      // console.log(geocoder);
      geocoder.geocode({ address: location }, (result, status) => {
        // console.log(result, status);
        if (status === "OK") {
          const geometry = result[0].geometry.location;
          const { lat, lng } = { lat: geometry.lat(), lng: geometry.lng() };
          setCoordintes({ lat, lng });
          setisLocationLoaded(true);
          cacher.cacheValue(location, { lat, lng });
        } else {
          setisError(true);
          setisLocationLoaded(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GoogleMap
      zoom={13}
      opacity={0.4}
      mapContainerStyle={{ height: "356px" }}
      center={coordinates}
      options={{disableDefaultUI: isError ? true : false}}
    >
      {!isError && isLocationLoaded && <Circle center={coordinates} options={options} />}
      {isError && isLocationLoaded && (
        <InfoWindow position={coordinates}>
          <div style={divStyle}>
            Ooops, there was an issue finding location on the map, we are trying
            to resolve issue as fast as possible, contact host for additional
            info if you are still interested in this place, we are sorry for
            inconvienience
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
