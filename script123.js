function replaceSymbols() {
  const input = document.getElementById("dateInput").value;
  const result = document.getElementById("dateResult");
  const newDate = input.replace(/-/g, "/");
  result.textContent = `Результат: ${newDate}`;
  result.style.color = "#00ffff";
}
