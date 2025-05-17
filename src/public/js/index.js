const cartId = document.querySelector(".product-page").dataset.cartId;
const cartBtn = document.querySelector(".cart-icon-container");
const userBtn = document.querySelector(".user-icon-container");

cartBtn.addEventListener("click", () => {
  window.location.href = `/carts/${cartId}`;
});

userBtn.addEventListener("click", () => {
  window.location.href = "/profile";
});
