
Instrucciones para el front: 

1.Al clonar el front se deben instalar las dependencias con yarn install o npm install
2.Modificar el archivo /src/http-common.js para cambiar el base uri e indicar la ruta en la que corre el backend.

Observaciones: 
El proyecto de Front esta centrado en el directorio scr/views/persona 
aqui se crean 3 componentes:
 Persona.js: es el componente principal se encarga de las interacciones por axios con la api y envia data y funciones para modificacion a los componentes que crean y listan. 
 ListarPersona.js : componente que contiene la tabla y acciones de creacion,modificacion o eliminacion.
 CreacionOEliminacion: componente que levanta el formulario para crear o modificar