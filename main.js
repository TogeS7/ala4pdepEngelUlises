// Modelo de datos inmutable
const crearTarea = ({
  titulo,
  descripcion = "",
  estado = "Pendiente",
  creacion = new Date(),
  ultimaEdicion = new Date(),
  vencimiento = null,
  dificultad = "Facil"
}) =>
  Object.freeze({
    id: crypto.randomUUID(),
    titulo,
    descripcion,
    estado,
    creacion,
    ultimaEdicion,
    vencimiento,
    dificultad
  });

// Crear tarea
const agregarTarea = (lista, tarea) => [...lista, tarea];

// Buscar tarea por título
const buscarTarea = (lista, titulo) =>
  lista.find(t => t.titulo.toLowerCase() === titulo.toLowerCase());

// Actualizar tarea
const actualizarTarea = (lista, id, cambios) =>
  lista.map(t =>
    t.id === id
      ? { ...t, ...cambios, ultimaEdicion: new Date() }
      : t
  );

// Eliminar tarea
const eliminarTarea = (lista, id) =>
  lista.filter(t => t.id !== id);

// Filtrar por estado
const filtrarPorEstado = (lista, estado) =>
  lista.filter(t => t.estado === estado);

// Marcar como terminada
const marcarComoTerminada = tarea =>
  ({ ...tarea, estado: "Terminada", ultimaEdicion: new Date() });

// Contar tareas completadas
const contarCompletadas = lista =>
  lista.reduce((acc, t) => acc + (t.estado === "Terminada" ? 1 : 0), 0);

// Ejemplo de uso
const listaInicial = [];
const tarea1 = crearTarea({ titulo: "Realizar tp ala4" });
const tarea2 = crearTarea({ titulo: "Entregar el TP", dificultad: "Dificil" });
const lista1 = agregarTarea(listaInicial, tarea1);
const lista2 = agregarTarea(lista1, tarea2);
const listaActualizada = actualizarTarea(lista2, tarea1.id, { estado: "En curso" });
const listaFinal = eliminarTarea(listaActualizada, tarea2.id);
const completadas = contarCompletadas(listaFinal);
console.log(listaFinal);
console.log("Tareas completadas:", completadas);
