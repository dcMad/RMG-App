import { render } from '@testing-library/react';
import React from 'react';

import '../css/style.css';


export default function Navigation(){

    map.addControl(new mapboxgl.NavigationControl()); //add zoom button controls

const locateTheUser = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true, //have high accuracy for tracking position
  },
  trackUserLocation: true, //always be tracking the position of the user for updates on movement
  showUserHeading: true //show where the user is looking
});

render()


}
export { Navigation as default };