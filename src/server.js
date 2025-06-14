const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET || 'secret';

app.use(cors());
app.use(bodyParser.json());

let places = [
  { id: 1, name: 'Beach Paradise', description: 'Sunny beach', location: 'Somewhere', price: 100, tags: ['beach'], rating: 4 },
  { id: 2, name: 'Mountain Retreat', description: 'Snowy mountains', location: 'Somewhere else', price: 80, tags: ['ski'], rating: 5 }
];

let reviews = [];
let users = [
  { id: 1, email: 'test@example.com', password: 'password', favorites: [] }
];

function authenticate(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.split(' ')[1];
  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/places', (req, res) => {
  const { type, budget } = req.query;
  let result = places;
  if (type) result = result.filter(p => p.tags.includes(type));
  if (budget) result = result.filter(p => p.price <= Number(budget));
  res.json(result);
});

app.get('/api/places/:id', (req, res) => {
  const place = places.find(p => p.id === Number(req.params.id));
  if (!place) return res.status(404).json({ error: 'Not found' });
  const placeReviews = reviews.filter(r => r.place_id === place.id);
  res.json({ ...place, reviews: placeReviews });
});

app.post('/api/reviews', authenticate, (req, res) => {
  const { place_id, text, rating } = req.body;
  const review = { id: reviews.length + 1, user_id: req.user.id, place_id, text, rating };
  reviews.push(review);
  res.status(201).json(review);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET);
  res.json({ token });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
