window.addEventListener("DOMContentLoaded", function () {
  loadProducts();

  // Setel atribut data halamannya
  document.body.setAttribute(
    "data-page",
    window.location.pathname.includes("dashboard.html") ? "dashboard" : "home"
  );
});

const apiUrl = "https://rsmage.site"; // Atur URL API Anda di sini

function loadProducts() {
  fetch(`${apiUrl}/products`)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Error ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .then((products) => {
      const productList = document.querySelector(".product-list");
      if (productList) {
        productList.innerHTML = "";

        if (products.length === 0) {
          productList.innerHTML = "<p>Tidak ada produk yang tersedia.</p>";
        } else {
          products.forEach(function (product) {
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");

            productItem.innerHTML = `
              <img src="${product.image}" alt="${product.name}" />
              <div>
                <h3>${product.name}</h3>
                <p>Rp ${parseInt(product.price).toLocaleString()}</p>
                <p>${product.description}</p>
                <a href="https://wa.me/${
                  product.whatsapp
                }">Hubungi di WhatsApp</a>
              </div>
              ${
                document.body.getAttribute("data-page") === "dashboard"
                  ? `
                <div class="edit-delete-buttons">
                  <button class="edit-button" onclick="editProduct('${product._id}')">Edit</button>
                  <button class="delete-button" onclick="deleteProduct('${product._id}')">Hapus</button>
                </div>
              `
                  : ""
              }
            `;

            productList.appendChild(productItem);
          });
        }
      }
    })
    .catch((error) => console.error("Error loading products:", error));
}

function updateProduct(productId, updatedProduct) {
  fetch(`${apiUrl}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Error ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      loadProducts(); // Refresh products list
    })
    .catch((error) => console.error("Error during fetch:", error));
}

function deleteProduct(productId) {
  fetch(`${apiUrl}/products/${productId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Error ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .then(() => loadProducts())
    .catch((error) => console.error("Error deleting product:", error));
}

function editProduct(productId) {
  fetch(`${apiUrl}/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Error ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .then((product) => {
      if (product) {
        document.getElementById("productId").value = productId;
        document.getElementById("productName").value = product.name;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productDescription").value =
          product.description;
        document.getElementById("productWhatsApp").value = product.whatsapp;
        document.getElementById("productImage").dataset.image = product.image;
      }
    })
    .catch((error) => console.error("Error fetching product:", error));
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

    const method = productId ? "PUT" : "POST";
    const url = productId
      ? `${apiUrl}/products/${productId}`
      : `${apiUrl}/products`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        loadProducts(); // Refresh products list
      })
      .catch((error) => console.error("Error during fetch:", error));
  };

  if (productImage) {
    reader.readAsDataURL(productImage);
  } else {
    const existingImage = document.getElementById("productImage").dataset.image;
    if (existingImage) {
      reader.onload({ target: { result: existingImage } });
    }
  }
});
