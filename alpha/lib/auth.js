import jwtDecode from "jwt-decode";

export const authenticateUser = (token) => {
  localStorage.setItem("token", token);
};

export const isUserAuthenticated = () =>
  localStorage.getItem("token") !== null;

export const deauthenticateUser = () => {
  localStorage.removeItem("token");
};

export const getToken = () =>
  localStorage.getItem("token");


export const getProfile = () =>
  jwtDecode(getToken());
