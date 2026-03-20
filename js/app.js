document.addEventListener("DOMContentLoaded", function () {
  // 1. تحديث السنة تلقائياً
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. تعريف العناصر
  const pdfGrid = document.getElementById("pdfGrid");
  const viewer = document.getElementById("viewer");
  const backBtn = document.getElementById("viewerBack");
  const frame = document.getElementById("viewerFrame");
  const viewerTitle = document.getElementById("viewerTitle");

  if (!pdfGrid || !viewer) return;

  // ====== 3. وظيفة رسم الكروت تلقائياً من الـ Data ======
  function renderPDFCards() {
    if (!window.PDFS) return;

    pdfGrid.innerHTML = window.PDFS.map(
      (pdf) => `
      <div class="pdf-card" data-aos="fade-up">
        <div class="card-thumb">
          <img src="${pdf.thumb}" alt="${pdf.title}" onerror="this.src='images/pdf/default-thumb.png'">
        </div>
        <div class="card-content">
          <h3>${pdf.title}</h3>
          <p>${pdf.desc}</p>
          <div class="card-actions">
            <a href="#" class="btn-view" data-pdf="${pdf.file}" data-title="${pdf.title}">عرض الملف</a>
            <a href="${pdf.file}" download class="btn-download"><i class="fas fa-download"></i></a>
          </div>
        </div>
      </div>
    `,
    ).join("");
  }

  // ====== 4. دوال التحكم في الـ Viewer ======
  function openViewer(pdfUrl, title) {
    pdfGrid.style.display = "none";
    viewer.classList.add("active"); // استخدم CSS classes أفضل للـ Animation
    viewer.style.display = "block";

    if (viewerTitle) viewerTitle.textContent = title;
    if (frame) frame.src = pdfUrl;

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeViewer() {
    viewer.style.display = "none";
    viewer.classList.remove("active");
    pdfGrid.style.display = "grid";
    if (frame) frame.src = "";
  }

  // ====== 5. الـ Event Listeners ======

  // زر الرجوع
  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeViewer();
    });
  }

  // مستمع النقرات على كروت الـ PDF
  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-pdf]");
    if (btn) {
      e.preventDefault();
      const url = btn.getAttribute("data-pdf");
      const title = btn.getAttribute("data-title");
      openViewer(url, title);
    }
  });

  // تشغيل الوظائف الأساسية
  renderPDFCards();
});
