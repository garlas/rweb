// fungsi halaman utama

window.addEventListener("DOMContentLoaded", function () {
  const productGrid = document.querySelector(".product-grid");
  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (products.length === 0) {
    productGrid.innerHTML = "<p>Tidak ada produk yang tersedia.</p>";
  } else {
    products.forEach(function (product) {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      productItem.innerHTML = `
              <img src="${product.image}" alt="${product.name}" />
              <div class="product-info">
                  <h3>${product.name}</h3>
                  <p>${product.price}</p>
                  <a href="https://wa.me/${product.whatsapp}">Hubungi di WhatsApp</a>
              </div>
          `;

      productGrid.appendChild(productItem);
    });
  }
});

// fungsi dashboard

function updateProduct(productId, updatedProduct) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products[productId] = updatedProduct;
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

function deleteProduct(productId) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(productId, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

function loadProducts() {
  const productList = document.querySelector(".product-list");
  const products = JSON.parse(localStorage.getItem("products")) || [];

  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<p>Tidak ada produk yang tersedia.</p>";
  } else {
    products.forEach(function (product, index) {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      productItem.innerHTML = `
              <img src="${product.image}" alt="${product.name}" />
              <div>
                  <h3>${product.name}</h3>
                  <p>${product.price}</p>
                  <p>${product.description}</p>
                  <a href="https://wa.me/${product.whatsapp}">Hubungi di WhatsApp</a>
              </div>
              <div class="edit-delete-buttons">
                  <button class="edit-button" onclick="editProduct(${index})">Edit</button>
                  <button class="delete-button" onclick="deleteProduct(${index})">Hapus</button>
              </div>
          `;

      productList.appendChild(productItem);
    });
  }
}

function editProduct(productId) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products[productId];

  if (product) {
    document.getElementById("productId").value = productId;
    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("productWhatsApp").value = product.whatsapp;

    // Set image if it exists
    document.getElementById("productImage").dataset.image = product.image;
  }
}

document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const productId = document.getElementById("productId").value;
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productImage = document.getElementById("productImage").files[0];
  const productDescription =
    document.getElementById("productDescription").value;
  const productWhatsApp = document.getElementById("productWhatsApp").value;

  const reader = new FileReader();
  reader.onload = function (e) {
    const product = {
      name: productName,
      price: productPrice,
      image: e.target.result,
      description: productDescription,
      whatsapp: productWhatsApp,
    };

    if (productId) {
      updateProduct(productId, product);
    } else {
      let products = JSON.parse(localStorage.getItem("products")) || [];
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
    }

    document.getElementById("productForm").reset();
    document.getElementById("productId").value = "";
    loadProducts();
  };

  if (productImage) {
    reader.readAsDataURL(productImage);
  } else {
    // Handle case where no new image is selected
    const existingImage = document.getElementById("productImage").dataset.image;
    reader.onload({ target: { result: existingImage } });
  }
});

window.addEventListener("DOMContentLoaded", loadProducts);
