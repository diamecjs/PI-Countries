import React from "react";
import "./styles/Paginado.css";

export default function Paginado({ countriesPerPage, allCountries, paginado }) {   //me creo una funcion y le paso por destructuring los paises por pagina, todos los paises  y la constante paginado del home
  const pageNumbers = []; //los numeros que voy a tener en mi pagina

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {  // con el for redondeo todos los paises que tengo
    pageNumbers.push(i);                             //lo envio a mi arreglo vacio                        // por los paises que quiero por pagina                       
  }

  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (            //  mapeo el arreglo y devuelvo los numeros que deviuelve el paginado
            <button
              key={number}
              onClick={() => paginado(number)}    //cuando hago clic le paso mi paginado de home
              id="PaginadoPaginado"               //que le pasa el numero de pagina y renderizo
            >
              {number}
            </button>
          ))}
      </ul>
    </nav>
  );
}
