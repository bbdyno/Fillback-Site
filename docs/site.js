// Language: ?lang=en|ko, otherwise the browser's language. Korean is the
// default markup so the page reads correctly without this script.
(function () {
  var q = new URLSearchParams(location.search).get("lang");
  var lang = q === "en" || q === "ko" ? q : /^ko/i.test(navigator.language || "") ? "ko" : "en";
  document.documentElement.lang = lang;
  var other = lang === "ko" ? "en" : "ko";
  document.querySelectorAll("[data-switch]").forEach(function (a) {
    var u = new URL(location.href);
    u.searchParams.set("lang", other);
    a.href = u.pathname + u.search + u.hash;
  });
  // Keep the choice when moving between pages.
  document.querySelectorAll("a[data-keep]").forEach(function (a) {
    if (lang === "en") a.href += (a.href.indexOf("?") < 0 ? "?" : "&") + "lang=en";
  });
})();

// The hero demo: an empty simple-authentication form, the fill chip, and
// the form filling itself in the formats this site asks for.
(function () {
  var demo = document.querySelector(".demo");
  if (!demo) return;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var boxes = Array.prototype.slice.call(demo.querySelectorAll("[data-fill]"));
  var check = demo.querySelector(".check");
  var chip = demo.querySelector(".chip");
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, reduce ? 0 : ms); }); };

  function reset() {
    boxes.forEach(function (b) { b.textContent = ""; b.classList.remove("lit"); });
    check.classList.remove("on");
    chip.classList.remove("show", "press");
  }

  async function run() {
    reset();
    await wait(900);
    chip.classList.add("show");
    await wait(1300);
    chip.classList.add("press");
    await wait(160);
    chip.classList.remove("show", "press");
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].textContent = boxes[i].getAttribute("data-fill");
      boxes[i].classList.add("lit");
      await wait(140);
    }
    check.classList.add("on");
    await wait(900);
    boxes.forEach(function (b) { b.classList.remove("lit"); });
    await wait(2600);
  }

  async function loop() {
    if (reduce) {
      boxes.forEach(function (b) { b.textContent = b.getAttribute("data-fill"); });
      check.classList.add("on");
      return;
    }
    for (;;) await run();
  }
  loop();
})();
