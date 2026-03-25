document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const colorToggle = document.getElementById("colorToggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const reveals = document.querySelectorAll(".reveal");
  const contactForm = document.getElementById("contactForm");
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");
  const formMessage = document.getElementById("formMessage");

  // Animación al hacer scroll
  function revealOnScroll() {
    reveals.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        section.classList.add("active");
      }
    });
  }

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  // Botón modo oscuro
  themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    // opcional: evitar mezcla con otro tema
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("alt-colors");
    }
  });

  // Botón cambiar color
  colorToggle.addEventListener("click", function () {
    body.classList.toggle("alt-colors");

    // opcional: evitar mezcla con modo oscuro
    if (body.classList.contains("alt-colors")) {
      body.classList.remove("dark-mode");
    }
  });

  // Cerrar menú móvil al hacer clic
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const navCollapse = document.getElementById("menuNav");
      if (navCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  // Validaciones
  function validarNombre() {
    if (nombre.value.trim().length >= 3) {
      nombre.classList.remove("is-invalid");
      nombre.classList.add("is-valid");
      return true;
    } else {
      nombre.classList.remove("is-valid");
      nombre.classList.add("is-invalid");
      return false;
    }
  }

  function validarEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email.value.trim())) {
      email.classList.remove("is-invalid");
      email.classList.add("is-valid");
      return true;
    } else {
      email.classList.remove("is-valid");
      email.classList.add("is-invalid");
      return false;
    }
  }

  function validarMensaje() {
    if (mensaje.value.trim().length >= 10) {
      mensaje.classList.remove("is-invalid");
      mensaje.classList.add("is-valid");
      return true;
    } else {
      mensaje.classList.remove("is-valid");
      mensaje.classList.add("is-invalid");
      return false;
    }
  }

  nombre.addEventListener("input", validarNombre);
  email.addEventListener("input", validarEmail);
  mensaje.addEventListener("input", validarMensaje);

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombreOk = validarNombre();
    const emailOk = validarEmail();
    const mensajeOk = validarMensaje();

    if (nombreOk && emailOk && mensajeOk) {
      formMessage.textContent = "Mensaje enviado correctamente.";
      formMessage.classList.remove("text-danger");
      formMessage.classList.add("text-success");

      contactForm.reset();
      nombre.classList.remove("is-valid");
      email.classList.remove("is-valid");
      mensaje.classList.remove("is-valid");
    } else {
      formMessage.textContent = "Por favor, completa correctamente todos los campos.";
      formMessage.classList.remove("text-success");
      formMessage.classList.add("text-danger");
    }
  });
});