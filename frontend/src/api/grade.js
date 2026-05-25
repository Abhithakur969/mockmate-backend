import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "";

export async function gradeAnswer({ question, answer, role }) {
  const { data } = await axios.post(`${BASE}/api/grade`, {
    question,
    answer,
    role,
  });
  return data;
}
