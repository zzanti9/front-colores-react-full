import { useState } from 'react'

function Formulario({crearColor}){

    let [textoTemporal,setTextoTemporal] = useState("")
    let [error,setError] = useState(false) // para decidir -> se ve o no 
    let [msgError, setMsgError] = useState("")
    
  return (
    <form onSubmit={evento=>{
        evento.preventDefault() // espera la carga

        setError(false)//que no haya error de momento para la validacion

        let valido = /^([0-9]{1,3},){2}[0-9]{1,3}$/.test(textoTemporal)
        // la expresion regular que compruebe (test) el texto del input

        if(valido){

          let [r,g,b] = textoTemporal.split(",").map(n => Number(n)); 
          // ; -> corta la linea, no hay salto de linea. Interpreta que no se ha creado array.
          // split crea ["999,"999","999"] y map [999,999,999]
          [r,g,b].forEach( n => valido = valido && n <= 255 )
          // creamos array de los valores para hacerle forEach y lo validamos

          if(valido){
              return fetch("https://api-colores-full-ei5u.onrender.com/colores/nuevo" ,{
                        method : "POST",
                        body : JSON.stringify({r,g,b}),
                        headers: {
                            "Content-type" : "application/json"
                        } 
                    })
                      .then(respuesta => respuesta.json())
                      .then(({error,id}) =>{
                      if(!error){
                        crearColor({id,r,g,b})
                        return setTextoTemporal("")
                      }
                      console.log("error a usuario")
                      })
                    }
            setMsgError("deben ser 3 numeros entre 0-255")
            return  setError(true)
          }

          setMsgError("formato inválido")
          setError(true)

          
        } }>
          <input 
                type="text" 
                placeholder="rrr,ggg,bbb" 
                value={textoTemporal} 
                onChange={ evento => setTextoTemporal(evento.target.value)}/>
          <p className={ ` error ${ error ? "visible" : ""}` }>{msgError}</p> 
          <input type="submit" value="crear color" />
      </form>
    )
}

export default Formulario
