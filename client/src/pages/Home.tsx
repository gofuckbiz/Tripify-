import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchPlaces, Place } from '../slices/placesSlice';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Home() {
  const dispatch = useAppDispatch();
  const places = useAppSelector(s => s.places.items);
  const [filters, setFilters] = useState({ type: '', budget: '', climate: '', season: '' });

  useEffect(() => {
    dispatch(fetchPlaces(filters));
  }, [dispatch, filters]);

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        <input placeholder="type" value={filters.type} onChange={e => setFilters(f => ({...f, type: e.target.value}))} className="border p-1" />
        <input placeholder="budget" value={filters.budget} onChange={e => setFilters(f => ({...f, budget: e.target.value}))} className="border p-1" />
        <input placeholder="climate" value={filters.climate} onChange={e => setFilters(f => ({...f, climate: e.target.value}))} className="border p-1" />
        <input placeholder="season" value={filters.season} onChange={e => setFilters(f => ({...f, season: e.target.value}))} className="border p-1" />
      </div>
      <div className="h-64 mb-4">
        <MapContainer center={[0,0]} zoom={2} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {places.map(p => (
            <Marker key={p.id} position={[p.location.lat, p.location.lng]}>
              <Popup>
                <Link to={`/places/${p.id}`}>{p.name}</Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <ul>
        {places.map(p => (
          <li key={p.id} className="mb-2">
            <Link to={`/places/${p.id}`}>{p.name}</Link> - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
