const regex = /cat/i;

function findCat() {
  const text = document.getElementById("textInput").value;
  const result = document.getElementById("catResult");

  if (regex.test(text)) {
    result.textContent = "Найдено слово 'cat'!";
    result.style.color = "#00ff88";
  } else {
    result.textContent = "Слово 'cat' не найдено.";
    result.style.color = "#ff4444";
  }
}
