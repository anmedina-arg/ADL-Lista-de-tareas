import { useState } from 'react';
import { tareasIniciales } from '../mockData/TareasIniciales';

const Tareas = () => {
  const [nombreTarea, setNombreTarea] = useState('');
  const [listaTareas, setListaTareas] = useState(tareasIniciales);

  // Función al enviar el formulario
  const enviarFormulario = (e) => {
    e.preventDefault();
    setListaTareas([
      ...listaTareas,
      { nombre: nombreTarea, completada: false },
    ]); // Agregamos la tarea
    setNombreTarea(''); // Vaciamos el formulario
  };

  // Función al escribir sobre el input del formulario
  const capturaInput = (e) => {
    setNombreTarea(e.target.value);
  };

  const completarTarea = (tarea) => {
    const nuevasTareas = [...listaTareas]; // Copiamos las tareas anteriores
    const index = nuevasTareas.findIndex((el) => el.nombre === tarea.nombre); // Buscamos la tarea a modificar en la lista
    nuevasTareas[index].completada = true;
    setListaTareas(nuevasTareas);
  };

  const eliminarTarea = (tarea) => {
    const listaFiltrada = listaTareas.filter(
      (el) => el.nombre !== tarea.nombre
    );
    setListaTareas(listaFiltrada);
  };

  console.log('lista de tareas', listaTareas);
  // console.log("lista de tareas filtradas", listaFiltrada  )

  return (
    <>
      <form onSubmit={enviarFormulario}>
        <input name="nombreTarea" onChange={capturaInput} value={nombreTarea} />
        <button>Agregar Tarea</button>
      </form>
      
      <ul>
        {listaTareas.map((tarea) => (
          <li
            key={tarea.nombre}
            style={
              tarea.completada === true
                ? { textDecoration: 'line-through' }
                : {}
            }
          >
            {tarea.nombre}
            {tarea.completada === false ? (
              <button onClick={() => completarTarea(tarea)}> Completar </button>
            ) : (
              ''
            )}
            <button onClick={() => eliminarTarea(tarea)}>Borrar</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tareas;
