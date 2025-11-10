export async function loadData() {
  if (!localStorage.getItem("factoryData")) {
    const data = await fetch("directories.json").then(r => r.json());
    localStorage.setItem("factoryData", JSON.stringify(data));
  }
  return JSON.parse(localStorage.getItem("factoryData"));
}

export function saveData(data) {
  localStorage.setItem("factoryData", JSON.stringify(data));
}
