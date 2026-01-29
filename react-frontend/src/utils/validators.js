// Name
export const isNameValid = (name) => {
  if (!name) return false;

  const trimmed = name.trim();

  if (trimmed.length < 2) return false;

  const nameRegex = /^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/;

  return nameRegex.test(trimmed);
};

// E-mail
export const isEmailValid = (email) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

// Password
export const isPasswordValid = (password) => {
  if (password.length < 14) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[@$%#*!&]/.test(password)) return false;
  if ((password.match(/\d/g) || []).length < 4) return false;
  return true;
};