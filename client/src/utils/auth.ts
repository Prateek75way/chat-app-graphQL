export const getToken = () => localStorage.getItem('token');
export const setToken = (token: string) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

// src/types.ts
export interface User {
  id: string;
  username: string;
  online: boolean;
}

export interface Message {
  id: string;
  sender: User;
  content: string;
  createdAt: string;
}