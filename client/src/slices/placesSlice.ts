import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Place {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  rating: number;
  climate: string;
  season: string;
  location: { lat: number; lng: number };
}

interface PlacesState {
  items: Place[];
}

const initialState: PlacesState = { items: [] };

export const fetchPlaces = createAsyncThunk('places/fetch', async (params: Record<string, string>) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`http://localhost:3001/api/places?${query}`);
  if (!res.ok) throw new Error('Failed');
  return await res.json() as Place[];
});

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export default placesSlice.reducer;
