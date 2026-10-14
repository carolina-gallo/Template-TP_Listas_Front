/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data; 
    mostrarComidas(comidas)                  // Asignar el JSON a la variable comidas
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });


let comidas = [];


const container = document.getElementById('comidaContainer');

/*
let i = 0;
 
function mostrarComidas(){
  while (i < comidas.length){
    container.innerHTML +=

  `
  <article class= "card">
  <h2 class= "comida"> ${comidas[i].nombre} </h2>
  <p class= "categoria"> ${comidas[i].categoria} </p>
  <p class= "provincia"> ${comidas[i].provincia} </p>
  <p class= "ingredientes"> Ingredientes: ${comidas[i].ingredientes}</p>
  </article>
  ` 
  i++
}
}
mostrarComidas()
*/

function mostrarComidas (lista){
  
  lista.forEach (comida => {
    container.innerHTML +=
`
  <article class= "card">
    <p class= "categoria"> ${comida.categoria}</p>
    <h2 class= "comida"> ${comida.nombre}</h2>
    <p class= "provincia"> ${comida.provincia}</p>
    <ul>
    ${comida.ingredientes.map( ingrediente=> `<li>${ingrediente}</li>`).join('')}
    </ul>
  </article>
  `
  })
}

const agregarComidaForm = document.getElementById("formdenuevacomida")

agregarComidaForm.addEventListener("submit", (event) => {

  event.preventDefault()
  //alert("Comida agregada: " + event.target.nombre.value);
  
  let nuevacomidita = {
    nombre: event.target.nombre.value,
    provincia: event.target.provincia.nombre.value,
    categoria: event.target.categoria.nombre.value,
    ingredientes: event.target.ingreedientes.nombre.value.split(",")
  }

  comidas.push (nuevacomidita)

  mostrarComidas (comidas)

  event.target.reset()
})

const filtrosporcategoria = document.getElementById("filtrosporcategoria")
const filtrosporProvincia = document.getElementById("filtrosporProvincia")
const busqueda = document.getElementById("buscador")

function filtrar() {
  let comidasFiltradas = comidas.filter( comida => {
    return comida.categoria.includes(filtrosporcategoria.value)
      && comida.provincia.includes(filtrosporProvincia.value)
  })

  mostrarComidas (comidasFiltradas)
}

function buscar() {
  let comidasFiltradas = comidas.filter( comida => {
    return comida.nombre.includes(busqueda.value.toLowerCase())
      || comida.provincia.toLowerCase().includes(busqueda.value.toLowerCase())
      || comida.categoria.toLowerCase().includes(busqueda.value.toLowerCase())
})

  mostrarComidas (comidasFiltradas)
}

filtrosporcategoria.addEventListener("change", filtrar)
filtrosporProvincia.addEventListener("change", filtrar)
busqueda.addEventListener("input", buscar)