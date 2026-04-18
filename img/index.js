// التحكم في زر القائمة في الهاتف

const menuButton = document.getElementById("menuBtn");
const navigation = document.getElementById("mainNav");

menuButton.addEventListener("click", function () {

    navigation.classList.toggle("open");

});




