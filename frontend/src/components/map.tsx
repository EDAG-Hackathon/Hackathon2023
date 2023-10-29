import MapboxMap from "react-map-gl";

export default function Map({ markers }: { markers: any[] }) {
  return (
    <MapboxMap
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 9.69612,
        latitude: 50.56517,
        zoom: 14,
      }}
      reuseMaps={true}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL}
    >
      {markers}
    </MapboxMap>
  );
}
