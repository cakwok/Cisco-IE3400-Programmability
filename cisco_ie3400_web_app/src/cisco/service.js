/*
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = axios.create({
  withCredentials: true,
});

const YELP_API_BASE = 'http://localhost:4000/proxy/yelp';
const REACT_APP_SERVER_API_URL="http://localhost:4000"
const USERS_API = `${process.env.REACT_APP_SERVER_API_URL}/users`;

const YELP_RESTAURANT_API = `${YELP_API_BASE}/restaurants`;
const RESTAURANT_API = "http://localhost:4000/api/restaurants";


export const getAllReviewsForRestaurant = async () => {
  const response = await api.get(
    `http://localhost:4000/api/restaurants/reviews`
  );
  return response.data;
};

export const userReviewsRestaurant = async (restaurantId, restaurant) => {
  const response = await api.post(`${RESTAURANT_API}/${restaurantId}/reviews`, restaurant);
  return response.data;
};

export const getReviewsForUser = async (userId) => {
  const response = await api.get(
    `http://localhost:4000/api/users/${userId}/reviews`
  );
  return response.data;
};

export const getReviewsForRestaurant = async (restaurantId) => {
  const response = await api.get(
    `http://localhost:4000/api/restaurants/${restaurantId}/reviews`
  );
  return response.data;
};

export const userLikesRestaurant = async (restaurantId, restaurant) => {
  const response = await api.post(`${RESTAURANT_API}/${restaurantId}/likes`, restaurant);
  console.log("response", response);
  return response.data;
};

export const getLikesForUser = async (userId) => {
  const response = await api.get(
    `http://localhost:4000/api/users/${userId}/likes`
  );
  return response.data;
};

export const getLikesForRestaurant = async (restaurantId) => {
  const response = await api.get(
    `http://localhost:4000/api/restaurants/${restaurantId}/likes`
  );
  return response.data;
};

export const fullSearch = async (query) => {
  const params = {
      location: query,
      sort_by: 'best_match',
    };
  const response = await axios.get(YELP_API_BASE, { params });
  return response.data;
}

export const getRestaurant = async (id) => {
  const response = await axios.get(
    `${YELP_API_BASE}/${id}`
  );
  const restaurants = response.data;
  return restaurants;
};

export const registerThunk = createAsyncThunk(
  "user/register",
  async (user) => await register(user)
);

export const loginThunk = createAsyncThunk(
  "user/login",
  async (user) => await login(user)
);

export const profileThunk = createAsyncThunk(
  "user/profile",
  async (user) => await profile(user)
);

export const logoutThunk = createAsyncThunk(
  "user/logout",
  async (user) => await logout(user)
);

export const register = async (user) => {
  const response = await api.post(`${USERS_API}/register`, user);
  return response.data;
};

export const login = async (user) => {
  const response = await api.post(`${USERS_API}/login`, user);
  return response.data;
};

export const profile = async (user) => {
  const response = await api.post(`${USERS_API}/profile`);
  return response.data;
};

export const logout = async (user) => {
  const response = await api.post(`${USERS_API}/logout`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axios.post(USERS_API, user);
  return response.data;
};

export const removeUser = async (userId) => {
  const response = await axios.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const updateUser = async (newUser) => {
  const response = await axios.put(`${USERS_API}/${newUser._id}`, newUser);
  return response.data;
};

export const getUsersWithRole = async (role) => {
  const response = await axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(USERS_API);
  return response.data;
};
export const getUserById = () => {};
*/