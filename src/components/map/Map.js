import 'regenerator-runtime';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, LayersControl } from "react-leaflet";
import React from 'react';
import { maps } from '../../constants/mapOptions';

export default function Map({ address }) {
  const { BaseLayer } = LayersControl;
  const [position, setPosition] = React.useState(null)

  function Locate() {
    const map = useMapEvents({});
    map.locate({ setView: true });
  };

  return (
    <div id='map'>
      <MapContainer
        center={position}
        zoom={18}
        minZoom={3}
        maxZoom={18}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        <Locate />

        {position ? <Marker
          position={position}
          icon={new L.Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [0, -35] })}
        >
          <Popup>
            {address ? address : `We dont have any information about this location.`}
          </Popup>
        </Marker> : <></>}

        <LayersControl>
          {maps.map((map, index) => {
            if (map.valid) {
              return (
                <BaseLayer checked={map.checked} name={map.name} key={index}>
                  <TileLayer
                    className='TileLayer'
                    url={map.url}
                    attribution={map.attribution}
                  />
                </BaseLayer>);
            }
          })}
        </LayersControl>
      </MapContainer>
    </div>
  );
}
