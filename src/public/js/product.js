const cartId = document.querySelector(".product-detail-page").dataset.cartId;

const cartBtn = document.querySelector(".cart-icon-container");
const addToCartBtn = document.querySelector(".add-to-cart-btn");

cartBtn.addEventListener("click", () => {
  window.location.href = `/carts/${cartId}`;
});

addToCartBtn.addEventListener("click", (event) => {
  const { id } = event.target;
  fetch(`/api/carts/${cartId}/products/${id}`, { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});
