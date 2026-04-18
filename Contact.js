// ===== Menu (Mobile) =====
const menuButton = document.getElementById("menuBtn");
const navigation = document.getElementById("mainNav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", function () {
    const opened = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", opened ? "true" : "false");
  });
}

// ===== Contact Form =====
const form = document.getElementById("formContact");
const resetBtn = document.getElementById("resetContactBtn");
const successMsg = document.getElementById("successContactMsg");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const topic = document.getElementById("topic");
const message = document.getElementById("message");

const errFullName = document.getElementById("errFullName");
const errEmail = document.getElementById("errEmail");
const errPhone = document.getElementById("errPhone");
const errTopic = document.getElementById("errTopic");
const errMessage = document.getElementById("errMessage");

function clearErrors() {
  errFullName.textContent = "";
  errEmail.textContent = "";
  errPhone.textContent = "";
  errTopic.textContent = "";
  errMessage.textContent = "";
  successMsg.textContent = "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
}

function isValidPhone(value) {
  const cleaned = (value || "").replace(/\s+/g, "");
  return /^0\d{9}$/.test(cleaned) || /^\+?\d{9,14}$/.test(cleaned);
}

function validateForm() {
  clearErrors();
  let ok = true;

  if (!fullName.value.trim()) {
    errFullName.textContent = "اكتب اسمك";
    ok = false;
  }

  if (!email.value.trim() || !isValidEmail(email.value.trim())) {
    errEmail.textContent = "اكتب بريد إلكتروني صحيح";
    ok = false;
  }

  if (!phone.value.trim() || !isValidPhone(phone.value.trim())) {
    errPhone.textContent = "اكتب رقم هاتف صحيح";
    ok = false;
  }

  if (!topic.value) {
    errTopic.textContent = "اختر موضوع الرسالة";
    ok = false;
  }

  if (!message.value.trim() || message.value.trim().length < 10) {
    errMessage.textContent = "اكتب رسالة واضحة (على الأقل 10 أحرف)";
    ok = false;
  }

  return ok;
}

if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    form.reset();
    clearErrors();
  });
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    successMsg.textContent = "تم إرسال رسالتك بنجاح";
    form.reset();
  });
}