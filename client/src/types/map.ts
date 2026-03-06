export type MapPoint = {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
};

export type City = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};