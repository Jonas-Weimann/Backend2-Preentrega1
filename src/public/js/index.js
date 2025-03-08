const cartBtn = document.querySelector(".cart-icon-container");

const createCart = () => {
  const savedCart = localStorage.getItem("CART_ID");
  if (!savedCart) {
    fetch("/api/carts", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("CART_ID", data.cid);
      });
  }
};

createCart();

cartBtn.addEventListener("click", () => {
  const savedCart = localStorage.getItem("CART_ID");
  window.location.href = `/carts/${savedCart}`;
});
