// ===== Menu (Mobile) =====
const menuButton = document.getElementById("menuBtn");
const navigation = document.getElementById("mainNav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", function () {
    const opened = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", opened ? "true" : "false");
  });
}

// ===== Booking Form =====
const form = document.getElementById("formBooking");
const resetBtn = document.getElementById("resetBtn");
const successMsg = document.getElementById("successMsg");

const ownerName = document.getElementById("ownerName");
const phone = document.getElementById("phone");
const dogName = document.getElementById("dogName");
const dogSize = document.getElementById("dogSize");
const service = document.getElementById("service");
const pack = document.getElementById("package");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

const addonPhotos = document.getElementById("addonPhotos");
const addonWalk = document.getElementById("addonWalk");
const addonVet = document.getElementById("addonVet");

// errors
const errOwnerName = document.getElementById("errOwnerName");
const errPhone = document.getElementById("errPhone");
const errDogName = document.getElementById("errDogName");
const errDogSize = document.getElementById("errDogSize");
const errService = document.getElementById("errService");
const errPackage = document.getElementById("errPackage");
const errCheckIn = document.getElementById("errCheckIn");
const errCheckOut = document.getElementById("errCheckOut");

// summary
const sumOwner = document.getElementById("sumOwner");
const sumPhone = document.getElementById("sumPhone");
const sumDog = document.getElementById("sumDog");
const sumSize = document.getElementById("sumSize");
const sumService = document.getElementById("sumService");
const sumPackage = document.getElementById("sumPackage");
const sumDays = document.getElementById("sumDays");
const sumPrice = document.getElementById("sumPrice");

function clearErrors() {
  errOwnerName.textContent = "";
  errPhone.textContent = "";
  errDogName.textContent = "";
  errDogSize.textContent = "";
  errService.textContent = "";
  errPackage.textContent = "";
  errCheckIn.textContent = "";
  errCheckOut.textContent = "";
  successMsg.textContent = "";
}

function isValidPhone(value) {
  const cleaned = (value || "").replace(/\s+/g, "");
  return /^0\d{9}$/.test(cleaned) || /^\+?\d{9,14}$/.test(cleaned);
}

function daysBetween(start, end) {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  const diff = e.getTime() - s.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.ceil(diff / oneDay);
}

function serviceLabel(val) {
  if (val === "boarding") return "إقامة فندقية";
  if (val === "daycare") return "رعاية نهارية";
  if (val === "grooming") return "تنظيف وتجميل";
  return "-";
}

function sizeLabel(val) {
  if (val === "small") return "صغير";
  if (val === "medium") return "متوسط";
  if (val === "large") return "كبير";
  return "-";
}

function packageLabel(val) {
  if (val === "basic") return "Basic";
  if (val === "premium") return "Premium";
  if (val === "vip") return "VIP";
  return "-";
}

function calcPrice() {
  const svc = service.value;
  const pkg = pack.value;
  const size = dogSize.value;

  let base = 0;

  // أسعار تقديرية للتدريب
  if (svc === "boarding") base = 20;
  if (svc === "daycare") base = 12;
  if (svc === "grooming") base = 15;

  if (pkg === "premium") base += 8;
  if (pkg === "vip") base += 15;

  if (size === "medium") base += 3;
  if (size === "large") base += 6;

  const d = daysBetween(checkIn.value, checkOut.value);
  const usedDays = (svc === "grooming") ? 1 : Math.max(d, 1);

  let addOns = 0;
  if (addonPhotos.checked) addOns += 3;
  if (addonWalk.checked) addOns += 4;
  if (addonVet.checked) addOns += 5;

  const total = (base * usedDays) + (addOns * usedDays);
  return { total, usedDays };
}

function updateSummary() {
  sumOwner.textContent = ownerName.value.trim() || "-";
  sumPhone.textContent = phone.value.trim() || "-";
  sumDog.textContent = dogName.value.trim() || "-";
  sumSize.textContent = sizeLabel(dogSize.value);
  sumService.textContent = serviceLabel(service.value);
  sumPackage.textContent = packageLabel(pack.value);

  const { total, usedDays } = calcPrice();
  sumDays.textContent = usedDays ? `${usedDays} يوم` : "-";
  sumPrice.textContent = `${total}`;
}

function validateForm() {
  clearErrors();
  let ok = true;

  if (!ownerName.value.trim()) {
    errOwnerName.textContent = "اكتب اسم صاحب الكلب";
    ok = false;
  }

  if (!phone.value.trim() || !isValidPhone(phone.value)) {
    errPhone.textContent = "اكتب رقم هاتف صحيح";
    ok = false;
  }

  if (!dogName.value.trim()) {
    errDogName.textContent = "اكتب اسم الكلب";
    ok = false;
  }

  if (!dogSize.value) {
    errDogSize.textContent = "اختر حجم الكلب";
    ok = false;
  }

  if (!service.value) {
    errService.textContent = "اختر نوع الخدمة";
    ok = false;
  }

  if (!pack.value) {
    errPackage.textContent = "اختر الحزمة";
    ok = false;
  }

  // التواريخ مهمة للإقامة والرعاية النهارية فقط
  if (service.value !== "grooming") {
    if (!checkIn.value) {
      errCheckIn.textContent = "اختر تاريخ الدخول";
      ok = false;
    }
    if (!checkOut.value) {
      errCheckOut.textContent = "اختر تاريخ الخروج";
      ok = false;
    }
    if (checkIn.value && checkOut.value) {
      const d = daysBetween(checkIn.value, checkOut.value);
      if (d <= 0) {
        errCheckOut.textContent = "تاريخ الخروج لازم يكون بعد الدخول";
        ok = false;
      }
    }
  }

  return ok;
}

// live update
[
  ownerName, phone, dogName, dogSize, service, pack, checkIn, checkOut,
  addonPhotos, addonWalk, addonVet
].forEach((el) => {
  if (el) el.addEventListener("input", updateSummary);
  if (el) el.addEventListener("change", updateSummary);
});

updateSummary();

if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    form.reset();
    clearErrors();
    updateSummary();
  });
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
      updateSummary();
      return;
    }

    updateSummary();
    successMsg.textContent = "تم إرسال الحجز بنجاح";
    form.reset();
    updateSummary();
  });
}