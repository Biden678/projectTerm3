// GoogleMapsLink.js

import React from 'react';

const GoogleMapsLink = ({ address }) => {
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  const openGoogleMaps = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <button onClick={openGoogleMaps}>
      Open in Google Maps
    </button>
  );
};

export default GoogleMapsLink;
