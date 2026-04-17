// ===== Menu (Mobile) =====
const menuButton = document.getElementById("menuBtn");
const navigation = document.getElementById("mainNav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", function () {
    const opened = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", opened ? "true" : "false");
  });
}

// ===== Toggle Notes =====
const toggleNoteBtn = document.getElementById("toggleNoteBtn");
const packagesNote = document.getElementById("packagesNote");

if (toggleNoteBtn && packagesNote) {
  toggleNoteBtn.addEventListener("click", function () {
    const opened = packagesNote.classList.toggle("open");
    toggleNoteBtn.textContent = opened ? "إخفاء الملاحظات" : "ملاحظات مهمة";
  });
}