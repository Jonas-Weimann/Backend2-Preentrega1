const message = document.getElementById("message");
const { error } = message.dataset;

if (error === "same") {
  message.innerHTML = "La contraseña no puede ser igual a la anterior<br/>";
  message.style.color = "red";
}

const checkNewPassword = () => {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password.length < 8) {
    message.innerHTML = "La contraseña debe tener al menos 8 caracteres<br/>";
    message.style.color = "red";
    return false;
  }

  if (password !== confirmPassword) {
    message.innerHTML = "Las contraseñas no coinciden<br/>";
    message.style.color = "red";
    return false;
  }

  message.innerHTML = "";
  return true;
};

const form = document.getElementById("resetForm");

form.addEventListener("submit", async (e) => {
  if (!checkNewPassword()) {
    e.preventDefault();
    return;
  }
});
