import React from 'react';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 55.89152,
  lng: 37.402525,
};
const marker = {
  position: center,
  title: 'Компаня Ангара Запчасти',
};

interface IProps {
  google_key: string;
}
function MyComponent({ google_key }: IProps) {
  return (
    <LoadScript googleMapsApiKey={google_key as string}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
        <>
          <Marker position={center} label={marker.title} title={marker.title} />
        </>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
