const deleteBtns = document.querySelectorAll(".delete-btn");
deleteBtns.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    event.preventDefault();
    const pid = event.target.getAttribute("pid");
    const cid = event.target.getAttribute("cid");
    await fetch(`/api/carts/${cid}/products/${pid}`, {
      method: "DELETE",
    }).then(() => location.reload());
  });
});

const emptyBtn = document.querySelector(".empty-cart-btn");
emptyBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const cid = event.target.getAttribute("cid");
  await fetch(`/api/carts/${cid}`, {
    method: "DELETE",
  }).then(() => location.reload());
});
