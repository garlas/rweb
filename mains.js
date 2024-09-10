document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("aspirasiForm");
  const submitButton = form.querySelector('input[type="submit"]');

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dari pengiriman secara default

    const selectedClass = sessionStorage.getItem("class"); // Mengambil kelas dari sessionStorage
    const teksAspirasi = document
      .querySelector('textarea[name="teksAspirasi"]')
      .value.trim();

    if (teksAspirasi === "") {
      alert("Teks aspirasi harus diisi!");
      return;
    }

    submitButton.disabled = true; // Nonaktifkan tombol kirim untuk mencegah pengiriman ganda

    const hari = new Date().toLocaleString(); // Format waktu lokal

    const webhookUrl =
      "https://discord.com/api/webhooks/1274643187742281788/949FutOCV7wUpFr5642KasuS6B1D1W2dyKTUWqOzLhF0dYASVQXNK8fqtmVlGorfXeqj"; // Ganti dengan URL webhook Anda

    const requestData = {
      embeds: [
        {
          title: "📢 Aspirasi Baru Diterima",
          description: "Berikut adalah detail dari aspirasi yang diterima:",
          color: 3066993,
          fields: [
            {
              name: "👤 Pengirim",
              value: `Kelas: ${selectedClass || "Tidak Terdaftar"}`, // Menggunakan kelas dari sessionStorage
              inline: false,
            },
            {
              name: "💬 Pesan Aspirasi",
              value: teksAspirasi,
              inline: false,
            },
            {
              name: "📅 Tanggal",
              value: hari,
              inline: false,
            },
          ],
          footer: {
            text: "Aspirasi ini dikirim melalui form online.",
          },
        },
      ],
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Aspirasi berhasil dikirim!");
          form.reset(); // Mengosongkan form setelah pengiriman
        } else {
          alert("Gagal mengirim aspirasi.");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        alert("Gagal mengirim aspirasi.");
      })
      .finally(() => {
        submitButton.disabled = false; // Aktifkan kembali tombol setelah pengiriman selesai
      });
  });
});
