const botonMenu = document.getElementById("botonMenu");
const listaMenu = document.getElementById("listaMenu");

botonMenu.addEventListener("click", function () {
  listaMenu.classList.toggle("show");
});

const enlacesMenu = listaMenu.querySelectorAll("a");
for (let i = 0; i < enlacesMenu.length; i++) {
  enlacesMenu[i].addEventListener("click", function () {
    listaMenu.classList.remove("show");
  });
}

const informacion = {
  software: "Duración: 6 ciclos. Aprenderás HTML, CSS, JavaScript, bases de datos y desarrollo de aplicaciones.",
  redes: "Duración: 6 ciclos. Aprenderás configuración de redes, servidores y seguridad informática.",
  marketing: "Duración: 4 ciclos. Aprenderás redes sociales, publicidad digital y análisis de resultados."
};

const botonesInfo = document.querySelectorAll(".boton-info");

function mostrarInformacion(evento) {
  const programa = evento.target.dataset.programa;
  const caja = document.getElementById("info-" + programa);

  if (!caja.classList.contains("d-none")) {
    caja.classList.add("d-none");
    evento.target.textContent = "Más información";
  } else {
    caja.textContent = informacion[programa];
    caja.classList.remove("d-none");
    evento.target.textContent = "Ocultar información";
  }
}

for (let i = 0; i < botonesInfo.length; i++) {
  botonesInfo[i].addEventListener("click", mostrarInformacion);
}

const formulario = document.getElementById("formulario");
const confirmacion = document.getElementById("confirmacion");

function mostrarError(campo, mensaje) {
  document.getElementById("error-" + campo).textContent = mensaje;
  const entrada = document.getElementById(campo);
  if (entrada) {
    entrada.classList.add("is-invalid");
  }
}

function limpiarErrores() {
  const errores = document.querySelectorAll(".invalid-feedback");
  for (let i = 0; i < errores.length; i++) {
    errores[i].textContent = "";
  }
  const campos = document.querySelectorAll(".is-invalid");
  for (let i = 0; i < campos.length; i++) {
    campos[i].classList.remove("is-invalid");
  }
}

function validarFormulario() {
  let valido = true;

  const nombres = document.getElementById("nombres").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const edad = Number(document.getElementById("edad").value);
  const edadTexto = document.getElementById("edad").value.trim();
  const programa = document.getElementById("programa").value;
  const terminos = document.getElementById("terminos").checked;

  if (nombres === "") {
    mostrarError("nombres", "Escribe tus nombres.");
    valido = false;
  }

  if (apellidos === "") {
    mostrarError("apellidos", "Escribe tus apellidos.");
    valido = false;
  }

  const arroba = correo.indexOf("@");
  const punto = correo.lastIndexOf(".");
  if (correo === "") {
    mostrarError("correo", "Escribe tu correo electrónico.");
    valido = false;
  } else if (arroba < 1 || punto < arroba + 2 || punto === correo.length - 1) {
    mostrarError("correo", "El correo no tiene un formato válido.");
    valido = false;
  }

  const soloNumeros = /^[0-9]{9}$/;
  if (telefono === "") {
    mostrarError("telefono", "Escribe tu teléfono.");
    valido = false;
  } else if (!soloNumeros.test(telefono)) {
    mostrarError("telefono", "El teléfono debe tener 9 dígitos.");
    valido = false;
  }

  if (edadTexto === "") {
    mostrarError("edad", "Escribe tu edad.");
    valido = false;
  } else if (edad < 15 || edad > 99) {
    mostrarError("edad", "La edad debe estar entre 15 y 99 años.");
    valido = false;
  }

  if (programa === "") {
    mostrarError("programa", "Selecciona un programa.");
    valido = false;
  }

  if (!terminos) {
    mostrarError("terminos", "Debes aceptar los términos y condiciones.");
    valido = false;
  }

  return valido;
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  limpiarErrores();
  confirmacion.classList.add("d-none");

  if (validarFormulario()) {
    const nombres = document.getElementById("nombres").value.trim();
    const programa = document.getElementById("programa").value;

    confirmacion.textContent =
      "¡Gracias, " + nombres + "! Tus datos para " + programa + " pasaron la validación. " +
      "Esto es solo una demostración en el navegador: los datos no se guardan ni se envían a ningún servidor.";
    confirmacion.classList.remove("d-none");
    formulario.reset();
  }
});

const anio = document.getElementById("anio");
anio.textContent = new Date().getFullYear();