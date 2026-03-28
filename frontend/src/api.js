import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/players"
});

export const getPlayers = () => API.get("");
export const getPlayerById = (id) => API.get(`/${id}`);
export const addPlayer = (player) => API.post("", player);
export const updatePlayer = (id, player) => API.put(`/${id}`, player);
export const deletePlayer = (id) => API.delete(`/${id}`);

export default API;