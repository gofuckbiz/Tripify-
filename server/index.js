import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'change-me';

app.use(cors());
app.use(express.json());

const places = [
  {
    id: 1,
    name: 'Sunny Beach',
    description: 'A nice beach.',
    price: 100,
    tags: ['beach'],
    rating: 4.5,
    climate: 'hot',
    season: 'summer',
    location: { lat: 42.7, lng: 27.7 }
  },
  {
    id: 2,
    name: 'Mountain Resort',
    description: 'Great for skiing.',
    price: 150,
    tags: ['ski'],
    rating: 4.7,
    climate: 'cold',
    season: 'winter',
    location: { lat: 46.8, lng: 8.2 }
  }
];
const reviews = [];
const users = [];

app.get('/api/places', (req, res) => {
  let result = places;
  if (req.query.type) {
    result = result.filter(p => p.tags.includes(req.query.type));
  }
  if (req.query.budget) {
    result = result.filter(p => p.price <= Number(req.query.budget));
  }
  if (req.query.climate) {
    result = result.filter(p => p.climate === req.query.climate);
  }
  if (req.query.season) {
    result = result.filter(p => p.season === req.query.season);
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

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, password: hashed, favorites: [] };
  users.push(user);
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.status(201).json({ token });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({ token });
});

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).end();
  try {
    const { id } = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    req.user = users.find(u => u.id === id);
    next();
  } catch (e) {
    res.status(401).end();
  }
}

app.get('/api/user', authMiddleware, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, favorites: req.user.favorites });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
