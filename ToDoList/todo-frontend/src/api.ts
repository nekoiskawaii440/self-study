import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addTask = async (title: string) => {
  const res = await axios.post(API_URL, { title, completed: false });
  return res.data;
};

export const updateTask = async (id: number, completed: boolean) => {
  const res = await axios.patch(`${API_URL}/${id}`, { completed });
  return res.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};