// زر القائمة في الهاتف
const menuButton = document.getElementById("menuBtn");
const navigation = document.getElementById("mainNav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", function () {
    const opened = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", opened ? "true" : "false");
  });
}

// عرض المزيد في صفحة من نحن
const showMoreBtn = document.getElementById("showMoreBtn");
const aboutMore = document.getElementById("aboutMore");

if (showMoreBtn && aboutMore) {
  showMoreBtn.addEventListener("click", function () {
    const isOpen = aboutMore.classList.toggle("open");

    showMoreBtn.textContent = isOpen ? "إخفاء" : "عرض المزيد";
  });
}