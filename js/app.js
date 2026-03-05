document.addEventListener("DOMContentLoaded", function () {
  // سنة الفوتر
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // عناصر الصفحة
  var pdfGrid = document.getElementById("pdfGrid");
  var viewer = document.getElementById("viewer");
  var backBtn = document.getElementById("viewerBack");
  var frame = document.getElementById("viewerFrame");

  // حماية: لو العناصر مش موجودة
  if (!pdfGrid || !viewer || !backBtn) return;

  // ====== دوال فتح/قفل ======
  function openViewer(pdfUrl, title) {
    // اخفي الشبكة
    pdfGrid.style.display = "none";

    // اعرض الـ viewer
    viewer.style.display = "block";

    // عنوان
    var t = document.getElementById("viewerTitle");
    if (t) t.textContent = title || "PDF Viewer";

    // افتح داخل iframe لو موجود
    if (frame) frame.src = pdfUrl || "";

    // حدّث أزرار فتح/تحميل لو عندك
    var openNew = document.getElementById("viewerOpenNew");
    var download = document.getElementById("viewerDownload");
    if (openNew) openNew.href = pdfUrl || "#";
    if (download) download.href = pdfUrl || "#";

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeViewer() {
    // اقفل الـ viewer
    viewer.style.display = "none";

    // رجع الشبكة
    pdfGrid.style.display = "grid"; // لو شبكتك grid
    // لو شبكتك block بدل grid: استخدم "block"

    // فضّي iframe
    if (frame) frame.src = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // زر الرجوع
  backBtn.addEventListener("click", function (e) {
    e.preventDefault();
    closeViewer();
  });

  // ====== مهم جداً ======
  // لو عندك زر "عرض PDF" داخل كل كارت — لازم ينادي openViewer
  // مثال: أي عنصر عليه data-pdf
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-pdf]");
    if (!btn) return;

    e.preventDefault();
    var url = btn.getAttribute("data-pdf");
    var title = btn.getAttribute("data-title") || "PDF";
    openViewer(url, title);
  });

  // أول ما الصفحة تفتح: اعرض الشبكة واخفي الـ viewer
  viewer.style.display = "none";
  pdfGrid.style.display = "grid";
});