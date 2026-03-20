document.addEventListener("DOMContentLoaded", function () {
  const stagesGrid = document.getElementById("stagesGrid");

  function renderStages() {
    // التأكد من أن البيانات موجودة في المصفوفة اللي سميناها STAGES_DATA
    if (!window.STAGES_DATA || !stagesGrid) return;

    stagesGrid.innerHTML = window.STAGES_DATA.map(
      (stage) => `
            <div class="stage-card" data-aos="zoom-in">
                <div class="stage-icon-box" style="background-color: ${stage.color}15; color: ${stage.color};">
                    <i class="fas fa-${stage.icon}"></i>
                </div>
                <div class="stage-content">
                    <h3 style="color: ${stage.color}">${stage.title}</h3>
                    <p>${stage.description}</p>
                    <a href="stage-details.html?id=${encodeURIComponent(stage.id)}" 
                       class="stage-link" 
                       style="border-color: ${stage.color}; color: ${stage.color}">
                        استكشف المرحلة <i class="fas fa-chevron-left"></i>
                    </a>
                </div>
            </div>
        `,
    ).join("");

    // تحديث AOS عشان الأنيميشن ميقفش بعد الرندر
    if (window.AOS) {
        AOS.refresh();
    }
  }

  renderStages();
});
