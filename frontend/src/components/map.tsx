import MapboxMap from "react-map-gl";

export default function Map() {
  return (
    <MapboxMap
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 9.68612,
        latitude: 50.55117,
        zoom: 10,
      }}
      reuseMaps={true}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL}
    />
  );
}
