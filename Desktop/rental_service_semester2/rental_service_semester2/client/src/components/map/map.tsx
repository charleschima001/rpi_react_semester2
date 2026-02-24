import React, { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { City, MapPoint } from '../../types/map';

type MapProps = {
  city: City;
  points: MapPoint[];
  selectedPoint?: MapPoint;
  className?: string;
};

function Map({ city, points, selectedPoint, className = 'cities__map' }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);
  const markersRef = useRef<leaflet.Marker[]>([]);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map && city) {
      map.setView([city.lat, city.lng], city.zoom);
    }
  }, [map, city.lat, city.lng, city.zoom]); 

  useEffect(() => {
    if (map) {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      points.forEach((point) => {
        const marker = leaflet
          .marker({
            lat: point.lat,
            lng: point.lng,
          }, {
            icon: (selectedPoint && point.id === selectedPoint.id)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
        markersRef.current.push(marker);
      });
    }

    return () => {
      if (map) {
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];
      }
    };
  }, [map, points]); 

  useEffect(() => {
    if (map && markersRef.current.length) {
      markersRef.current.forEach((marker, index) => {
        const point = points[index];
        if (point) {
          const isSelected = selectedPoint && point.id === selectedPoint.id;
          marker.setIcon(isSelected ? currentCustomIcon : defaultCustomIcon);
        }
      });
    }
  }, [map, selectedPoint, points]); 

  return (
    <div
      style={{ height: '100%' }}
      className={className}
      ref={mapRef}
    />
  );
}

export { Map };