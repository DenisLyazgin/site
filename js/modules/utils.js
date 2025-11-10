// utils.js — мини “база данных” через localStorage
export async function getData() {
  const local = localStorage.getItem("factoryData");
  if (local) return JSON.parse(local);
  const res = await fetch("data.json");
  const data = await res.json();
  localStorage.setItem("factoryData", JSON.stringify(data));
  return data;
}

export function saveData(data) {
  localStorage.setItem("factoryData", JSON.stringify(data));
}
