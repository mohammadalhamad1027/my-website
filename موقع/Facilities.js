// ===== Menu (Mobile) =====
const menuButton = document.getElementById("menuBtn");
const navigation = document.getElementById("mainNav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", function () {
    const opened = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", opened ? "true" : "false");
  });
}

// ===== Modal for Facilities =====
const modal = document.getElementById("facilityModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");

const buttons = document.querySelectorAll(".facility-btn");

function openModal(title, desc) {
  modalTitle.textContent = title;
  modalBody.textContent = desc;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const title = btn.getAttribute("data-title") || "تفاصيل";
    const desc = btn.getAttribute("data-desc") || "";
    openModal(title, desc);
  });
});

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});