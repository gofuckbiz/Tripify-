import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Place {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  location: { lat: number; lng: number };
}

export default function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [weather, setWeather] = useState<string>('');

  useEffect(() => {
    fetch(`http://localhost:3001/api/places/${id}`)
      .then(res => res.json())
      .then(setPlace)
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!place) return;
    // Example weather fetch (may fail without API key)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.location.lat}&longitude=${place.location.lng}&current_weather=true`)
      .then(res => res.json())
      .then(d => setWeather(d.current_weather?.temperature ? `${d.current_weather.temperature}°C` : ''))
      .catch(() => setWeather(''));
  }, [place]);

  if (!place) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{place.name}</h2>
      <p className="mb-2">{place.description}</p>
      <p className="mb-2">Average price per day: ${place.price}</p>
      <p className="mb-2">Rating: {place.rating}</p>
      {weather && <p className="mb-2">Current temp: {weather}</p>}
      <div className="h-64">
        <MapContainer center={[place.location.lat, place.location.lng]} zoom={10} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[place.location.lat, place.location.lng]} />
        </MapContainer>
      </div>
    </div>
  );
}
