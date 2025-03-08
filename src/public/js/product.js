const cartBtn = document.querySelector(".cart-icon-container");
const addToCartBtn = document.querySelector(".add-to-cart-btn");

cartBtn.addEventListener("click", () => {
  const savedCart = localStorage.getItem("CART_ID");
  window.location.href = `/carts/${savedCart}`;
});

addToCartBtn.addEventListener("click", (event) => {
  const savedCart = localStorage.getItem("CART_ID");
  const { id } = event.target;
  fetch(`/api/carts/${savedCart}/products/${id}`, { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});
