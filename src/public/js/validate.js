const checkPassword = () => {
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let message = document.getElementById("message");
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

const form = document.getElementById("registerForm");
form.addEventListener("submit", async (e) => {
  if (!checkPassword()) {
    e.preventDefault();
    return;
  }
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  try {
    await fetch("/api/email/registerSuccess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    form.submit();
  } catch (error) {
    console.error("Error al registrarse:", error);
  }
});
