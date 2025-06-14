import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const places = [
  { id: 1, name: 'Sunny Beach', description: 'A nice beach.', price: 100, tags: ['beach'], rating: 4.5 },
  { id: 2, name: 'Mountain Resort', description: 'Great for skiing.', price: 150, tags: ['ski'], rating: 4.7 }
];
const reviews = [];

app.get('/api/places', (req, res) => {
  let result = places;
  if (req.query.type) {
    result = result.filter(p => p.tags.includes(req.query.type));
  }
  if (req.query.budget) {
    result = result.filter(p => p.price <= Number(req.query.budget));
  }
  res.json(result);
});

app.get('/api/places/:id', (req, res) => {
  const place = places.find(p => p.id === Number(req.params.id));
  if (place) {
    res.json(place);
  } else {
    res.status(404).json({ message: 'Place not found' });
  }
});

app.post('/api/reviews', (req, res) => {
  const { user_id, place_id, text, rating } = req.body;
  const review = { id: reviews.length + 1, user_id, place_id, text, rating };
  reviews.push(review);
  res.status(201).json(review);
});

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  // Dummy JWT token
  res.json({ token: `fake-jwt-token-for-${email}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
