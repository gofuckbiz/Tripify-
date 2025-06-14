import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface User {
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = { user: null };

export const login = createAsyncThunk('auth/login', async (credentials: {email: string; password: string}) => {
  const res = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json() as User;
});

export const register = createAsyncThunk('auth/register', async (credentials: {email: string; password: string}) => {
  const res = await fetch('http://localhost:3001/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error('Register failed');
  return await res.json() as User;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
