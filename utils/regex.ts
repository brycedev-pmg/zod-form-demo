export const usernameRegex = /^(?:@?[A-Za-z0-9]+)?$/;

export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

/**
 * Zod has much more robust handler for validating emails. This is the easiest regex I found to use and even then. This is very
 */
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
