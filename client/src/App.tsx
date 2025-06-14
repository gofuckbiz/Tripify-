import { Routes, Route, Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchPlaces } from './slices/placesSlice';
import { useEffect } from 'react';
import Home from './pages/Home';
import PlaceDetails from './pages/PlaceDetails';

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-4 flex justify-between">
        <Link to="/" className="text-2xl font-bold">Tripify</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places/:id" element={<PlaceDetails />} />
      </Routes>
    </div>
  );
}
