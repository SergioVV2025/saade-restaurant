const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const signin = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to sign in. Please try again.");
  }

  return data;
};

const signup = async (name, email, password, confirmPassword) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      confirmPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to create your account. Please try again.",
    );
  }

  return data;
};

const getCurrentUser = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to retrieve user information.");
  }

  return data;
};

export { signin, signup, getCurrentUser };
