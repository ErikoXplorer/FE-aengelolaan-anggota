// function confirmReset(event) {
//   // Mencegah default behavior dari link atau tombol
//   event.preventDefault();

//   // Menampilkan dialog konfirmasi
//   var result = confirm("Apakah Anda yakin ingin mereset form ini?");

//   // Jika user mengklik "OK", reset form
//   if (result) {
//     document.getElementById("myForm").reset();
//   }
// }

// reset
function resetForm() {
  Swal.fire({
    title: "Reset Formulir?",
    text: "Apakah Anda yakin ingin mengosongkan semua isian?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Reset",
    cancelButtonText: "Batal",
    customClass: {
      container: "swal-container",
      popup: "swal-popup",
      title: "swal-title",
      content: "swal-content",
      confirmButton: "swal-confirm-button",
      cancelButton: "swal-cancel-button",
    },
    width: "90%",
    padding: "2em",
    background: "#fff",
  }).then((result) => {
    if (result.isConfirmed) {
      // Reset form jika user mengkonfirmasi
      document.getElementById("diagnosaForm").reset();
      currentStep = 1;
      showStep(currentStep);
      Swal.fire({
        title: "Formulir Direset",
        text: "Semua isian telah dikosongkan.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "swal-confirm-button",
        },
      });
    }
  });
}

// hapus
function hapusForm() {
  Swal.fire({
    title: "Hapus Formulir?",
    text: "Apakah Anda yakin ingin menghapus ini?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
    customClass: {
      container: "swal-container",
      popup: "swal-popup",
      title: "swal-title",
      content: "swal-content",
      confirmButton: "swal-confirm-button",
      cancelButton: "swal-cancel-button",
    },
    width: "90%",
    padding: "2em",
    background: "#fff",
  }).then((result) => {
    if (result.isConfirmed) {
      // Reset form jika user mengkonfirmasi
      document.getElementById("diagnosaForm").reset();
      currentStep = 1;
      showStep(currentStep);
      Swal.fire({
        title: "Formulir Direset",
        text: "Semua isian telah dikosongkan.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "swal-confirm-button",
        },
      });
    }
  });
}

// toggle theme
const themeToggleBtn = document.getElementById("theme-toggle");
let darkMode = false;

// Check local storage for saved theme
if (localStorage.getItem("dark-mode") === "enabled") {
  darkMode = true;
  document.body.classList.add("dark-mode");
  document.querySelector(".gradient-bg").classList.add("dark-mode");
  document
    .querySelectorAll(".card")
    .forEach((card) => card.classList.add("dark-mode"));
  document.querySelector("footer").classList.add("dark-mode");
  themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

themeToggleBtn.addEventListener("click", () => {
  darkMode = !darkMode; // Toggle dark mode state
  if (darkMode) {
    document.body.classList.add("dark-mode");
    document.querySelector(".gradient-bg").classList.add("dark-mode");
    document
      .querySelectorAll(".card")
      .forEach((card) => card.classList.add("dark-mode"));
    document.querySelector("footer").classList.add("dark-mode");
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem("dark-mode", "enabled"); // Save to local storage
  } else {
    document.body.classList.remove("dark-mode");
    document.querySelector(".gradient-bg").classList.remove("dark-mode");
    document
      .querySelectorAll(".card")
      .forEach((card) => card.classList.remove("dark-mode"));
    document.querySelector("footer").classList.remove("dark-mode");
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.removeItem("dark-mode");
  }
});

// pencarian anggota

$(document).ready(function () {
  let membersData = []; // Variabel untuk menyimpan data anggota yang diterima dari `getMembers.js`

  // Mendapatkan data dari script sebelumnya (getMembers.js) saat document siap
  $.ajax({
    type: "GET",
    url: "https://be-pengelolaan-anggota.vercel.app/v1/getAllMembers",
    dataType: "json",
    success: function (response) {
      if (response && response.data && response.data.length > 0) {
        membersData = response.data; // Simpan data anggota ke variabel
      }
    },
  });

  // Event untuk pencarian anggota berdasarkan nama
  $("#search-form").on("submit", function (event) {
    event.preventDefault(); // Mencegah form submit default

    const searchTerm = $("#search-input").val().toLowerCase(); // Ambil nilai dari search input

    // Filter data anggota berdasarkan nama
    const filteredMembers = membersData.filter((member) =>
      member.name_member.toLowerCase().includes(searchTerm)
    );

    displayMembers(filteredMembers); // Panggil fungsi displayMembers untuk menampilkan hasil pencarian
  });

  // Fungsi menampilkan anggota (dapat dipindah ke file utility jika diperlukan)
  function displayMembers(data) {
    const memberContainer = $("#member");
    memberContainer.empty(); // Kosongkan kontainer

    if (data.length > 0) {
      data.forEach((member) => {
        const cardHtml = `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div class="card shadow">
              <div class="text-center m-3">
                <img src="${member.image_url}" class="img-fluid rounded-circle" 
                  style="width: 150px; height: 150px; object-fit: cover;" alt="Foto">
              </div>
              <div class="card-body">
                <h5 class="card-title">${member.name_member}</h5>
                <p class="card-text">Hobi: ${member.hobbies}</p>
                <p class="card-text">TTL: ${member.placeOfBirth}, ${new Date(
          member.birth_date
        ).toLocaleDateString()}</p>
                <div class="d-flex justify-content-end">
                  <a href="detail.html?id=${
                    member.id
                  }" class="btn btn-primary btn-sm">
                    <i class="fa-solid fa-eye"></i> Detail
                  </a>
                </div>
              </div>
            </div>
          </div>`;

        memberContainer.append(cardHtml);
      });
    } else {
      memberContainer.html("<p>No members found</p>");
    }
  }
});
