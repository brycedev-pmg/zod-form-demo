export const usernameRegex = /^[a-zA-Z0-9]+$/;

export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
