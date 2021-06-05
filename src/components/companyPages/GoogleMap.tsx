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
const onLoad = (marker: any) => {
  console.log(marker);
};

function MyComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyB7dVZLu07pvlk6hOO5tvU8pGaUqwbyxG8">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
        <>
          <Marker
            onLoad={onLoad}
            position={center}
            label={marker.title}
            title={marker.title}
          />
        </>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
