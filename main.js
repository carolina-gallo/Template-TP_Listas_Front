/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
  
    console.log(data);    
    comidas = data; 
    mostrarComidas(comidas)                  // Asignar el JSON a la variable comidas
    actualizarfiltros()
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });


let comidas = [];


const container = document.getElementById('comidaContainer');

function mostrarComidas (lista){
    container.innerHTML=""
  lista.forEach (comida => {
    container.innerHTML +=
`
  <article class= "card">
  <h2 class= "comida"> ${comida.nombre}</h2>
    <p class= "provinciaymetodo"> <img class= "argentina" src="metodo.png" alt="metodo"> ${comida.categoria}</p>
    <p class= "provinciaymetodo"> <img class= "argentina" src="ubicacion.png" alt="argentina"> ${comida.provincia}</p>
    <p class= "ingredientes">Ingredientes:</p>
    <ul>
    ${comida.ingredientes.map( ingrediente=> `<li class="ingr">${ingrediente}</li>`).join('')}
    </ul>
  </article>
  `
  })
}

const agregarComidaForm = document.getElementById("formdenuevacomida")

agregarComidaForm.addEventListener ("submit", (event) => {

  event.preventDefault()
  //alert("Comida agregada: " + event.target.nombre.value);
  
  const ingredientesInputs = document.querySelectorAll (".ingrediente")
  let ingredientes= []

  ingredientesInputs.forEach(input => {
    ingredientes.push(input.value);
  })

  let nuevacomidita = {
    nombre: event.target.nombre.value,
    provincia: event.target.provincia.value,
    categoria: event.target.categoria.value,
    ingredientes: ingredientes
  }

  comidas.push (nuevacomidita)

  mostrarComidas (comidas)

  ingredientesContainer.innerHTML = 
  `<input type="text" class="ingrediente" placeholder="Agregar ingrediente" required>`
   

  event.target.reset()
});

const filtrosporcategoria = document.getElementById("filtrosporcategoria")
const filtrosporProvincia = document.getElementById("filtrosporProvincia")
const busqueda = document.getElementById("buscador")

function filtrar() {
  let comidasFiltradas = comidas.filter( comida => {
    return comida.categoria.includes(filtrosporcategoria.value)
      && comida.provincia.includes(filtrosporProvincia.value)
  })

  mostrarComidas(comidasFiltradas)
}

function buscar() {
  let comidasFiltradas = comidas.filter( comida => {
    return comida.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
      || comida.provincia.toLowerCase().includes(busqueda.value.toLowerCase())
      || comida.categoria.toLowerCase().includes(busqueda.value.toLowerCase())
})

  mostrarComidas (comidasFiltradas)
}

filtrosporcategoria.addEventListener("change", filtrar)
filtrosporProvincia.addEventListener("change", filtrar)
busqueda.addEventListener("input", buscar)


const agregarIngredienteBtn = document.getElementById ("agregaringrediente")
const ingredientesContainer = document.querySelector(".contenedor-ingredientes")

agregarIngredienteBtn.addEventListener ("click", (e) => {

  ingredientesContainer.innerHTML += 
   '<input type="text" class="ingrediente" placeholder="Agregar ingrediente" required>'
})

function actualizarfiltros () {
  let categorias = []
  let provincias = []
  comidas.forEach (comida => {
    if( !categorias.includes(comida.categoria)) {
    categorias.push(comida.categoria)
    }
    if( !provincias.includes(comida.provincia)){
      provincias.push(comida.provincia)
    }
  })

  categorias.forEach (categoria=> {
  filtrosporcategoria.innerHTML += `<option value="${categoria}">${categoria}</option>`
  })
  provincias.forEach (provincia=>{
    filtrosporProvincia.innerHTML += `<option value="${provincia}">${provincia}</option>`
  })
}