fetch("./db/medicos.json")
  .then((resp) => resp.json())
  .then((meddd) => localStorage.setItem("medicos", JSON.stringify(meddd)));

let medicos;
medicos = JSON.parse(localStorage.getItem("medicos")) || [];
let turnos;
turnos = JSON.parse(localStorage.getItem("turnos")) || [];
let pacientes;
pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
let turnitos;
turnitos = JSON.parse(localStorage.getItem("turnitos")) || [];
let listaTurnos;
listaTurnos = JSON.parse(localStorage.getItem("listaTurnos")) || [];

const DateTime = luxon.DateTime;

console.log(turnos);

const botonCrearTurnos = document.querySelector("#botonCrearTurnos");
const botonAgendarTurnos = document.querySelector("#botonAgendarTurnos");

const botonVolver = document.querySelector("#volver");

const contenidoCrear = document.querySelector("#contenidoCrear");
const contenidoAgendar = document.querySelector("#contenidoAgendar");

const botonesModoMedico = document.querySelector("#botonesModoMedicos");
const botonesModoPaciente = document.querySelector("#botonesModoPaciente");

const contenedorRegistrarTurnos = document.querySelector(
  "#contenedorRegistrarTurnos"
);
const contenedorTurnos = document.querySelector("#contenedorTurnos");
const contenedorBuscarTurnos = document.querySelector(
  "#contenedorBuscarTurnos"
);
const turnosDia = document.querySelector("#contenedorRegistrarTurnos");
const contenedorTurnosDia = document.querySelector("#turnosDia");

botonCrearTurnos.addEventListener("click", () => {
  botonCrearTurnos.style.display = "none";
  botonAgendarTurnos.style.display = "none";

  botonVolver.style.display = "block";
  botonesModoMedico.style.display = "block";
});

botonAgendarTurnos.addEventListener("click", () => {
  botonCrearTurnos.style.display = "none";
  botonAgendarTurnos.style.display = "none";

  botonVolver.style.display = "block";
  botonesModoPaciente.style.display = "block";
});

const botonVerCrearTurnos = document.querySelector("#botonVerCrearTurnos");
const botonTurnosProgramados = document.querySelector(
  "#botonTurnosProgramados"
);

botonVerCrearTurnos.addEventListener("click", () => {
  botonesModoMedico.style.display = "none";

  contenedorRegistrarTurnos.style.display = "block";
});

botonTurnosProgramados.addEventListener("click", () => {
  botonesModoMedico.style.display = "none";

  contenedorTurnos.style.display = "block";
});

const botonIniciarSesion = document.querySelector("#botonIniciarSesion");
const botonRegistrarUsuario = document.querySelector("#botonRegistrarUsuario");
const contenedorRegistrarUsuarios = document.querySelector(
  "#contenedorRegistrarUsuarios"
);
const contenedorIniciarSesion = document.querySelector(
  "#contenedorIniciarSesion"
);

botonRegistrarUsuario.addEventListener("click", () => {
  botonesModoPaciente.style.display = "none";

  contenedorRegistrarUsuarios.style.display = "block";
});

botonIniciarSesion.addEventListener("click", () => {
  botonesModoPaciente.style.display = "none";

  contenedorIniciarSesion.style.display = "block";
});

botonVolver.addEventListener("click", () => {
  botonCrearTurnos.style.display = "block";
  botonAgendarTurnos.style.display = "block";

  botonVolver.style.display = "none";
  botonesModoMedico.style.display = "none";
  botonesModoPaciente.style.display = "none";
  contenedorRegistrarTurnos.style.display = "none";
  contenedorTurnos.style.display = "none";
  contenedorBuscarTurnos.style.display = "none";
  turnosDia.style.display = "none";
  contenedorRegistrarUsuarios.style.display = "none";
  contenedorIniciarSesion.style.display = "none";
  contenedorTurnosDia.style.display = "none";
  contenedorListaTurnos.style.display = "none";
});

let esp = document.querySelector("#especialidad");
let boton = document.querySelector("#buscarTurnos");
let med = document.querySelector("#medicos");
let formulario = document.querySelector("#formularioTurnos");
let divTurnos = document.querySelector("#turnosDia");

esp.addEventListener("change", (e) => {
  let medicosFilter = medicos.filter(
    (m) => m.especialidad.toLocaleLowerCase() === esp.value
  );
  let medicoshtml = medicosFilter.map((m) => {
    return `<option value="${m.nombre}">${m.nombre}</option>`;
  });
  med.innerHTML = medicoshtml;
});

const fechaInput = document.querySelector("#fecha");
const servicioSelect = document.querySelector("#especialidad");
const medicoSelect = document.querySelector("#medicos");

boton.addEventListener("click", (e) => {
  e.preventDefault();
  contenedorTurnosDia.style.display = "block";
  if (fechaInput.value === "" || servicioSelect.value === "" || medicoSelect.value ==="") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por Favor complete todos los campos",
    });
    e.preventDefault();
  } else {
    let turnosfiltro = turnos.filter((t) => t.dia === fechaInput.value);
    console.log(turnosfiltro);
    let turnosMedico = turnosfiltro.filter((t) =>t.medico.toLocaleLowerCase() === medicoSelect.value.toLocaleLowerCase());
    if(turnosMedico.length>0){
      generarTurnos(turnosMedico[0]);
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se encontraron turnos",
      });contenedorTurnosDia.style.display = "none";
    } 
    
  }

 
});

//registrarUsuarios

const formularioUsuario = document.querySelector("#formularioUsuarios");
const dniUsuario = document.querySelector("#dniUsuario");
const nombreUsuario = document.querySelector("#nombreUsuario");
formularioUsuario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (dniUsuario.value === "" || nombreUsuario.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por Favor complete todos los campos",
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Se registro con exito!",
      showConfirmButton: false,
      timer: 1500,
    });
    const Usuario = {
      dniUsuario: dniUsuario.value,
      nombreUsuario: nombreUsuario.value,
    };
    pacientes.push(Usuario);

    localStorage.setItem("pacientes", JSON.stringify(pacientes));
    formularioUsuario.reset();
  }
});

//Formulario "iniciarSesion"

const formularioIniciarSesion = document.querySelector(
  "#formularioIniciarSesion"
);
const dniUsuarioSesion = document.querySelector("#dniUsuarioSesion");
let usuarioenSesion;

formularioIniciarSesion.addEventListener("submit", (e) => {
  e.preventDefault();

  usuarioenSesion = pacientes.find(
    (paciente) => paciente.dniUsuario === dniUsuarioSesion.value
  );

  console.log(usuarioenSesion);
  if (usuarioenSesion) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Sesion iniciada",
      showConfirmButton: false,
      timer: 1500,
    });
    sessionStorage.setItem("usuario", JSON.stringify(usuarioenSesion));
    contenedorBuscarTurnos.style.display = "block";
    contenedorIniciarSesion.style.display = "none";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Usuario no encontrado",
    });
  }
  formularioIniciarSesion.reset();
});


function generarTurnos(turnosMedico) {
  const id = turnosMedico.id;

  let turnosDiaFiltrados = listaTurnos.find((turno) => turno[0].id === id);

  console.log(turnosDiaFiltrados);

  contenedorTurnosDia.style.display = "block";

  contenedorTurnosDia.innerHTML = `<div><p>Medico: ${turnosDiaFiltrados[0].medico}</p><p> Especialidad: ${turnosDiaFiltrados[0].servicio}</p><p> Dia: ${turnosDiaFiltrados[0].dia}</p></div>`;

  turnosDiaFiltrados.forEach((t) => {
    const horaInicio = DateTime.fromISO(t.horainicio);
    const horaFin = DateTime.fromISO(t.horafin);
    const divTurno = document.createElement("div");
    if (t.paciente === "") {
      divTurno.className = "noAsignado";
    } else {
      divTurno.className = "asignado";
    }
    divTurno.innerHTML = `<p> Hora inicio: ${horaInicio.toFormat(
      "HH:mm"
    )}</p><p> Hora fin: ${horaFin.toFormat("HH:mm")}</p><p> Paciente: ${
      t.paciente
    }</p>`;

   
    divTurno.addEventListener("click", () => {
      const turnoActual = t;
      if (turnoActual.paciente === "") {
        Swal.fire({
          title: "¿Quieres asignar este turno?",
          icon: "question",
          html: `
          <p>Dia: ${fechaInput.value}</p>
          <p>Hora: ${horaInicio.toFormat("HH:mm")}</p>`,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          showCancelButton: true,
        }).then((respuesta) => {
          if (respuesta.isConfirmed) {
            Swal.fire({
              title: "Turno asignado",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
            divTurno.classList.remove("asignado");
            divTurno.classList.add("noAsignado");
            turnoActual.paciente = usuarioenSesion.nombreUsuario;
            localStorage.setItem("listaTurnos", JSON.stringify(listaTurnos));
            generarTurnos(turnosMedico);
          }
        });
      } else {
        Swal.fire({
          title: "¿Quieres cancelar el turno?",
          icon: "question",
          html: `
          <p>Dia: ${fechaInput.value}</p>
          <p>Hora: ${horaInicio.toFormat("HH:mm")}</p>`,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          showCancelButton: true,
        }).then((respuesta) => {
          if (respuesta.isConfirmed) {
            Swal.fire({
              title: "Turno cancelado",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
            divTurno.classList.remove("asignado");
            divTurno.classList.add("noAsignado");
            turnoActual.paciente = "";
            localStorage.setItem("listaTurnos", JSON.stringify(listaTurnos));
            generarTurnos(turnosMedico);
          }
        });
      }
    });

    contenedorTurnosDia.appendChild(divTurno);
  });
}



const nombre = document.querySelector("#nombre");
const dni = document.querySelector("#dni");
const fechaNacimiento = document.querySelector("#fechaNacimiento");
const form = document.querySelector("#formm");

let formularioTurnos = document.querySelector("#formTurnos");
const especialidad = document.querySelector("#especialidad2");
const medico = document.querySelector("#medicos2");
const dia = document.querySelector("#fechadia");
const horainicio = document.querySelector("#horainicio");
const horafin = document.querySelector("#horafin");
const frecuencia = document.querySelector("#frecuencia");

especialidad.addEventListener("change", (e) => {
  let medicosFilter = medicos.filter(
    (m) => m.especialidad.toLocaleLowerCase() === especialidad.value
  );
  let medicoshtml = medicosFilter.map((m) => {
    return `<option value="${m.nombre}">${m.nombre}</option>`;
  });
  medico.innerHTML = medicoshtml;
});



formularioTurnos.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    especialidad.value === "" ||
    medico.value === "" ||
    horainicio.value === "" ||
    horafin.value === "" ||
    dia.value == "" ||
    frecuencia.value === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por Favor complete todos los campos",
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Se registro el turno con exito!",
      showConfirmButton: false,
      timer: 1500,
    });

    
    const horaInicio = DateTime.fromISO(`${dia.value}T${horainicio.value}:00`);
    const horaFin = DateTime.fromISO(`${dia.value}T${horafin.value}:00`);

    const eventoNuevo = {
      id: Date.now().toString(36),
      servicio: especialidad.value,
      medico: medico.value,
      horainicio: DateTime.fromISO(`${dia.value}T${horainicio.value}:00`),
      horafin: DateTime.fromISO(`${dia.value}T${horafin.value}:00`),
      dia: dia.value,
      frecuencia: frecuencia.value,
    };
    
    const turnosGenerados = [];
    let currentHora = horaInicio;
    while (currentHora <= horaFin) {
      turnosGenerados.push({
        id: Date.now().toString(36),
        servicio: especialidad.value,
        medico: medico.value,
        horainicio: currentHora,
        horafin: currentHora.plus({ minutes: parseInt(frecuencia.value) }),
        dia: dia.value,
        paciente: "",
      });
      currentHora = currentHora.plus({ minutes: parseInt(frecuencia.value) });
    }

    listaTurnos.push(turnosGenerados);
    localStorage.setItem("listaTurnos", JSON.stringify(listaTurnos));

   
    turnos.push(eventoNuevo);

    
    localStorage.setItem("turnos", JSON.stringify(turnos));

   
    mostrarTurnos();

    
    formularioTurnos.reset();
  }
});


function mostrarTurnos() {
  contenedorTurnos.innerHTML = "";

  turnos.forEach((turno) => {
    const turn = document.createElement("div");

    // Fecha y hora de inicio
    const dia = document.createElement("p");
    dia.innerHTML = `Día: ${turno.dia}`;
    turn.appendChild(dia);

    // Servicio
    const servicio = document.createElement("p");
    servicio.innerHTML = `Servicio: ${turno.servicio}`;
    turn.appendChild(servicio);

    // Médico
    const medico = document.createElement("p");
    medico.innerHTML = `Médico: ${turno.medico}`;
    turn.appendChild(medico);

    // Hora de inicio
    const horainicio = document.createElement("p");
    const horaInicio = DateTime.fromISO(turno.horainicio);
    horainicio.innerHTML = `Hora inicio: ${horaInicio.toFormat("HH:mm")}`;
    turn.appendChild(horainicio);

    // Hora de fin
    const horafin = document.createElement("p");
    const horaFin = DateTime.fromISO(turno.horafin);
    horafin.innerHTML = `Hora fin: ${horaFin.toFormat("HH:mm")}`;
    turn.appendChild(horafin);

    // Frecuencia
    const frecuencia = document.createElement("p");
    frecuencia.innerHTML = `Frecuencia de los turnos: ${turno.frecuencia} minutos.`;
    turn.appendChild(frecuencia);

    // Botón de eliminar
    const boton = document.createElement("div");
    const buton = document.createElement("button");
    buton.innerHTML = "Eliminar";
    buton.setAttribute("data-id", turno.id);
    buton.classList.add("bDelete");
    
    boton.appendChild(buton);

    // Botón de ver
    const divBotonVer = document.createElement("div");
    const botonVer = document.createElement("button");
    botonVer.innerHTML = "Ver";
    botonVer.setAttribute("data-id", turno.id);
    botonVer.classList.add("botonVer");
    divBotonVer.appendChild(botonVer);

    turn.appendChild(divBotonVer);
    turn.appendChild(boton);

    contenedorTurnos.appendChild(turn);
  });
}

contenedorTurnos.addEventListener("click", (e) => {
  if (e.target.classList.contains("bDelete")) {
    const id = e.target.getAttribute("data-id");
    Swal.fire({
      title: "¿Quieres eliminar los tunos?",
      icon: "question",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        Swal.fire({
          title: "Turnos eliminados",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        turnos = turnos.filter((turno) => turno.id !== id);
        localStorage.setItem("turnos", JSON.stringify(turnos));
        listaTurnos = listaTurnos.filter((turn) => turn[0].id != id);
        localStorage.setItem("listaTurnos", JSON.stringify(listaTurnos));
        mostrarTurnos();
      }
    });
  }
});
contenedorTurnos.addEventListener("click", (e) => {
  if (e.target.classList.contains("botonVer")) {
    const id = e.target.getAttribute("data-id");
    mostrarListaTurnos(id);
  }
});

mostrarTurnos();

const contenedorListaTurnos = document.querySelector("#contenedorListaTurnos");

function mostrarListaTurnos(id) {
  console.log(id);

  contenedorTurnos.style.display = "none";
  contenedorListaTurnos.style.display = "block";

  let turnosDiaFiltrados = listaTurnos.find((turno) => turno[0].id === id);

  if (turnosDiaFiltrados) {
    contenedorListaTurnos.innerHTML = `<div><p> Medico: ${turnosDiaFiltrados[0].medico}</p><p> Especialidad: ${turnosDiaFiltrados[0].servicio}</p><p> Dia: ${turnosDiaFiltrados[0].dia}</p></div>`;

    let turnoshtml = turnosDiaFiltrados.map((m) => {
      const horaInicio = DateTime.fromISO(m.horainicio);
      const horaFin = DateTime.fromISO(m.horafin);
      return `<div><p> Hora inicio: ${horaInicio.toFormat(
        "HH:mm"
      )}</p><p> Hora fin: ${horaFin.toFormat("HH:mm")}</p><p> Paciente: ${
        m.paciente
      }</p></div>`;
    });

    contenedorListaTurnos.innerHTML += turnoshtml.join("");} 
    else {
    
    contenedorListaTurnos.innerHTML = "<p>No se encontraron turnos para este ID.</p>";
  }
}

