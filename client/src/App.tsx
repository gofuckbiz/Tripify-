import { useEffect, useState } from 'react';

interface Place {
  id: number;
  name: string;
  description: string;
}

export default function App() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/places')
      .then((res) => res.json())
      .then(setPlaces)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Tripify Destinations</h1>
      <ul>
        {places.map((p) => (
          <li key={p.id}>{p.name} - {p.description}</li>
        ))}
      </ul>
    </div>
  );
}
