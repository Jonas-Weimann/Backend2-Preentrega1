

const socketClient = io()
const productsContainer = document.querySelector('.products-container')
const form = document.getElementById("add-product-form")
let deleteBtns = document.querySelectorAll(".card--delete")

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)
  const imageInput = document.getElementById('input-image');

  if (imageInput.files.length > 0) {
    const imageFormData = new FormData();
    imageFormData.append('img', imageInput.files[0]);
    
    //Envio la imagen con el metodo POST
    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: imageFormData
      });

      const imageUrl = await response.text();
      if (!imageUrl) throw new Error('No se recibió la URL de la imagen');

      //Si se subio correctamente la imagen, procedo a subir su url junto a la data
      formData.append('img', imageUrl)

      //Extraigo la data del form 
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      //Envio la data emitiendo el evento add-product
      socketClient.emit('add-product', data)
      form.reset()

    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  }
})

const addDeleteEventListeners = () =>{
  deleteBtns = document.querySelectorAll(".card--delete");
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      const productId = event.target.closest('.product-card').querySelector('.card--id').textContent;
      socketClient.emit('delete-product', productId);
    });
  });
}

addDeleteEventListeners()

socketClient.on('load-products', (products) => {
  //Recibo los nuevos productos actualizados junto al evento load-products y los renderizo
  productsContainer.innerHTML = "";
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
            <span class="card--id" >${product.id}</span>
            <img src="${product.img}" alt="${product.title}">
            <span class="card--title"><b>${product.title}</b></span>
            <span class="card--cat"><b>${product.category}</b></span>
            <p class="card--desc">${product.description}</p>
            <button class="card--delete">Eliminar</button>
        `;

    productsContainer.appendChild(productCard);
  });
  addDeleteEventListeners();
})
