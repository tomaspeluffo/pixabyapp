import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {

  // State de la App
  const[busqueda, guardarBusqueda] = useState("");
  const[imagenes, guardarImagenes] = useState([]);
  const[paginaactual, guardarPaginaactual]=useState(1);
  const[totlapaginas, guardarTotalPaginas]= useState(1);  

  useEffect(() => {
    const consultarApi = async () =>{
      if (busqueda === "") return;

      const imagenesPorPagina = 30;
      const key= '17460140-b94351232523d31a0f057cd97';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      // Calcular el total de paginas

      const calcularTotalPaginas = Math.ceil(resultado.totalHits/imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      console.log(resultado);  

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({behavior: "smooth"})
  
    }
    consultarApi();
    
  }, [busqueda, paginaactual])

  // Definir pagina anterior
  const paginaAnterior = () =>{
    const nuevaPaginaActual = paginaactual -1;
    if(nuevaPaginaActual === 0) return

    guardarPaginaactual(nuevaPaginaActual);
  }

  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaactual +1;
    if(nuevaPaginaActual === totlapaginas+1) return
    guardarPaginaactual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>

        <Formulario 
          guardarBusqueda= {guardarBusqueda}
        />

      </div>

      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes ={imagenes}
        />

      { (paginaactual === 1) ? null
      : (<button
      type="button"
      className="bbtn btn-info mr-1"
      onClick={paginaAnterior}
    >&laquo; Anterior</button>)
    }

      { (paginaactual === totlapaginas) ? null
      :(<button
      type="button"
      className="bbtn btn-info"
      onClick={paginaSiguiente}
    >Siguiente &raquo;</button>) 
    }

      </div>

    </div>

    );
  }

export default App;
