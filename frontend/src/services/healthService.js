export const getMedicalHistory = async (userId) => {
  const response = await fetch(`http://localhost:8000/medical-history/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch medical history");
  return await response.json();
};
