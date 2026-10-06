document.addEventListener("DOMContentLoaded", function () {
  // DARK MODE
  const body = document.body;
  const themeToggle = document.getElementById("nav-5");
  const themeIcon = themeToggle?.querySelector("i");

  function setTheme(isDark) {
    body.classList.toggle("dark", isDark);

    if (themeIcon) {
      themeIcon.classList.toggle("fa-moon", !isDark);
      themeIcon.classList.toggle("fa-sun", isDark);
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  function loadTheme() {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      setTheme(storedTheme === "dark");
    } else {
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }

  loadTheme();

  themeToggle?.addEventListener("click", function () {
    setTheme(!body.classList.contains("dark"));
  });

  // ACTIVE MENU
  const currentPath = window.location.pathname;

  document.querySelectorAll(".nav-3 li a").forEach((link) => {
    try {
      const linkPath = new URL(link.href).pathname;

      if (
        linkPath === currentPath ||
        (currentPath === "/" && linkPath.includes("index.html"))
      ) {
        link.classList.add("active");
      }
    } catch (error) {}
  });

  //  HAMBURGER MENU
  const toggle = document.querySelector(".nav-7");
  const menu = document.querySelector(".nav-3");

  toggle?.addEventListener("click", function () {
    menu?.classList.toggle("show");

    const icon = toggle.querySelector("i");

    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
    }
  });

  // CAROUSEL
  const slides = document.querySelectorAll(".cl-2.slide");

  let index = 0;

  const SLIDE_DURATION = 12000;

  function showSlide(i) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    if (slides[i]) {
      slides[i].classList.add("active");
    }
  }

  if (slides.length > 1) {
    showSlide(0);

    setInterval(function () {
      index = (index + 1) % slides.length;

      showSlide(index);
    }, SLIDE_DURATION);
  }

  // CARD FLIP
  const cards = document.querySelectorAll(".cd-2");

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      card.classList.toggle("flipped");
    });
  });

  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry, entryIndex) => {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add("flipped");
          }, entryIndex * 500);

          observerInstance.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cards.forEach((card) => {
      observer.observe(card);
    });
  }

  // LOGO
  const logoFlip = document.getElementById("logoFlip");
  if (logoFlip) {
    logoFlip.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }
});
