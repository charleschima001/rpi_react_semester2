import { JSX, useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, MapPoint } from '../../types/map';

type MapProps = {
  city: City;
  points: MapPoint[];
  selectedPoint: MapPoint | undefined;
};

function Map({ city, points, selectedPoint }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<leaflet.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && city?.location) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = leaflet.map(mapRef.current).setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );

      leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(map);

      const defaultIcon = leaflet.icon({
        iconUrl: '/img/pin.svg',
        iconSize: [27, 39],
        iconAnchor: [13.5, 39],
      });

      const activeIcon = leaflet.icon({
        iconUrl: '/img/pin-active.svg',
        iconSize: [27, 39],
        iconAnchor: [13.5, 39],
      });

      points.forEach((point) => {
        leaflet.marker(
          [point.latitude, point.longitude],
          {
            icon: selectedPoint?.id === point.id ? activeIcon : defaultIcon,
          }
        ).addTo(map);
      });

      mapInstanceRef.current = map;
    }
  }, [city, points, selectedPoint]);

  return <div ref={mapRef} style={{ height: '100%', minHeight: '500px' }} />;
}

export { Map };