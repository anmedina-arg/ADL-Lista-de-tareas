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
    // console.log('desde capturaInput', e.target.value);
    // debaunce
    setNombreTarea(e.target.value);
  };

  const completarTarea = (tarea) => {
    //console.log('esta es la tarea que quiero completar', tarea);

    const nuevasTareas = [...listaTareas]; // Copiamos las tareas anteriores

    const index = nuevasTareas.findIndex((el) => el.nombre === tarea.nombre); // Buscamos la tarea a modificar en la lista
    //    [ {}, {}, {}, {}, {}, {}, {}, ... , {}]
    //       |                                      => el.nombre === tarea.nombre ? indice : continua
    //           |                                  => el.nombre === tarea.nombre ? indice : continua
    //                 |                              => el.nombre === tarea.nombre ? indice : continua ==> indice=3
    nuevasTareas[index].completada = true;
    //nuevasTareas[3].completada ==> true
    setListaTareas(nuevasTareas);
  };

  const eliminarTarea = (tarea) => {
    console.log(listaTareas);

    const copiaListaTareas = [...listaTareas];

    const listaFiltrada = copiaListaTareas.filter(
      (el) => el.nombre !== tarea.nombre
    );
    //    [ {}, {}, {}, {}, {}, {}, {}, ... , {}]
    //       |                                      => el.nombre (tarea uno) !== tarea.nombre (tarea uno) --> NO CUMPLE LA CONDICION, NO ES DIFERENTE
    //           |                                  => el.nombre (tarea dos) !== tarea.nombre (tarea uno) --> Si cumple la condicion, es diferente! <-- SI RETORNA
    //                 |                            => el.nombre (tarea tres) !== tarea.nombre (tarea uno) --> Si cumple la condicion, es diferente! <-- SI RETORNA

    // [ {2}, {3}]

    console.log(listaFiltrada);

    setListaTareas(listaFiltrada);
  };

  // console.log('lista de tareas', listaTareas);
  // console.log("lista de tareas filtradas", listaFiltrada  )

  return (
    <>
      <form onSubmit={enviarFormulario}>
        <input name="nombreTarea" onChange={capturaInput} value={nombreTarea} />
        <button>Agregar Tarea Nueva</button>
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
            ) : null}

            <button onClick={() => eliminarTarea(tarea)}>Borrar</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tareas;
