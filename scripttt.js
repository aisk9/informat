const regex = /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/;

function checkPhone() {
  const phone = document.getElementById("phone").value;
  const result = document.getElementById("phoneResult");

  if (regex.test(phone)) {
    result.textContent = " Формат номера корректен!";
    result.style.color = "#00ff88";
  } else {
    result.textContent = "Неверный формат. Пример: +7-777-123-45-67";
    result.style.color = "#ff5555";
  }
}
