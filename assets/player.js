// Turn the stacked slide images into a one-at-a-time player. Without JS, all slides stay stacked.
(function () {
  var player = document.getElementById("player");
  var slides = player.querySelectorAll("img");
  var count = document.getElementById("count");
  var i = 0;
  player.classList.add("is-player");
  slides.forEach(function (img) { img.loading = "eager"; });
  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (img, k) { img.hidden = k !== i; });
    count.textContent = (i + 1) + " / " + slides.length;
  }
  document.getElementById("prev").onclick = function () { show(i - 1); };
  document.getElementById("next").onclick = function () { show(i + 1); };
  document.getElementById("full").onclick = function () {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (player.requestFullscreen) player.requestFullscreen().catch(function () {});
  };
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); show(i + 1); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); show(i - 1); }
  });
  slides.forEach(function (img) {
    img.addEventListener("click", function (e) {
      var r = img.getBoundingClientRect();
      show(e.clientX - r.left < r.width / 3 ? i - 1 : i + 1);
    });
  });
  var x0 = null;
  player.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  player.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(dx < 0 ? i + 1 : i - 1);
    x0 = null;
  });
  show(0);
})();
