export const registerUser = async (formData) => {
  const response = await fetch("http://localhost:8000/register", {
    method: "POST",
    body: formData
  });
  if (!response.ok) throw new Error("Registration failed");
  return await response.json();
};

export const loginUser = async (username, password) => {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) throw new Error("Login failed");
  return await response.json();
};
