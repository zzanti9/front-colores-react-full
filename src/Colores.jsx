import { useState, useEffect } from 'react'
import Formulario from './Formulario'
import Color from './Color'

function Colores() {
  
  let [colores,setColores] = useState([])  

  useEffect(() => {
    fetch("https://api-colores-full-ei5u.onrender.com/colores")
    .then(respuesta => respuesta.json())
    .then(respuesta => {
      setColores(respuesta)
    })
  }, [])
  //[] pq es para carga inicial de los datos, solo se ejecuta una vez
  // aqui van las primeras llamadas a las APIs
  
  function crearColor(color){
    setColores([...colores,color])
  }
  // funcion para añadir el color al padre(Colores.jsx)


  function borrarColor(id){
    fetch("https://api-colores-full-ei5u.onrender.com/colores/borrar/" + id,{
      method : "DELETE"
    })
    .then(respuesta => respuesta.json())
    .then(({resultado}) => {
      if (resultado == "ok"){
        return setColores(colores.filter(color => color.id != id))
      }
      console.log("...error usuario")
    })
  }


  return (
    <>
      <Formulario crearColor={crearColor} />
      <ul>
        {colores.map(({id,r,b,g}) => <Color key={id} id={id} r={r} g={g} b={b} borrarColor={borrarColor}/>)}
      </ul>
    </>
  )
}



export default Colores

