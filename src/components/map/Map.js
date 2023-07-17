import 'regenerator-runtime';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMapEvents, LayersControl, useMap } from "react-leaflet";
import React from 'react';
import { maps } from '../../constants/mapOptions';
import Pointer from '../../images/pointer.svg';

function SetViewOnClick() {
  const map = useMap();
  map.setView([31, 35], map.getZoom());

  return null;
};

export default function Map() {
  const { BaseLayer } = LayersControl;
  const [position, setPosition] = React.useState([31, 35]);
  const setPositionCoord = (coords) => setPosition(coords);

  function Locate(setPosition) {
    const map = useMapEvents({});
    map.locate({ setView: true, zoom: 18 })
      .on('locationfound', function (e) {
        if (e) {
          setPosition(e.latlng);
          return map.removeEventListener('locationfound');
        }
      })
      .on('locationerror', function (e) {
        console.log(e);
        alert("Location access has been denied.");
      });
    map.setZoom(5);
  };

  return (
    <div id='map'>
      <MapContainer
        center={[31, 35]}
        zoom={18}
        minZoom={3}
        maxZoom={18}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        <img src={Pointer} alt='Map pointer' className='app__map-pointer' />
        <Locate setPosition={setPositionCoord} />
        <SetViewOnClick coords={position} />
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
