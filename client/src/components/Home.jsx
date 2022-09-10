import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterCountriesByContinents,
  orderByName,
  orderByPopulation,
  filterCreated,
  getActivities,
} from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import "./styles/Home.css";
import "./SearchBar";
import SearchBar from "./SearchBar";
export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);
  const [orden, setOrden] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // me defino un estado local de mi pagina actual y uno que me setee
  
  const [countriesPerPage, setCountriesPerPage] = useState(10); //me defino otro estado local para la cantidad de paises por pagina y que me setee en 10
  
  const indexOfLasCountries = currentPage * countriesPerPage; //me declaro una constante con el indice del ultimo pais que va a ser igual
                                                              //a mi pagina actual por la cantidad de paises por pagina
  
 const indexOfFirstCountries = indexOfLasCountries - countriesPerPage;//me declaro constante con el indice del primer pais que va a ser igual
                                                                      // al indice del ultimo pais por pagina menos los paises por pagina
 
 const currentCountries = allCountries.slice(              //me desclaro una constante y me traigo el arreglo del estado de paises
    indexOfFirstCountries,                                  //con el slice tomo la parte del arreglo que necesito entre el indice del primero y el ultimo pais
    indexOfLasCountries
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);               //me declaro una constante paginado que le voy a pasar un numero de pagina y voy a setear en ese numero de pagina
  };                                              //esta constante me ayuda a renderizar

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    if(currentPage === 1)
          setCountriesPerPage(9)
          else
          setCountriesPerPage(10)
  }, [currentPage])

  function handleClickCountries(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  function handleFilterContinents(e) {
    e.preventDefault();
    dispatch(filterCountriesByContinents(e.target.value));
  }
  function handleSelec(el) {
    el.preventDefault();
    dispatch(filterCreated(el.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Orden ${e.target.value}`);
  }
  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrden(`Orden ${e.target.value}`);
  }

  function handlePrev(e) {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  }
  function handleNext(e) {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  }

  return (
    <div id="HomeDiv">
      <button id="botonCreate">
        <Link to="/activities">Create Activity</Link>
      </button>
      <h1 id="titulo">Countries of the World</h1>
      <button id="reloadCountries" onClick={(e) => handleClickCountries(e)}>
      Reload Countries🌎
      </button>

      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="UnAlph">No alphabetical order</option>
          <option value="asc">Ascending order</option>
          <option value="des">Descending order</option>
        </select>

        <select onChange={(e) => handleSortPopulation(e)}>
          <option value="Unpop">No population order</option>
          <option value="asc">Ascending order</option>
          <option value="des">Descending order</option>
        </select>

        <select onChange={(e) => handleFilterContinents(e)}>
          <option value="AllContinents">All continents</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Africa">Africa</option>
        </select>

        <select onChange={(el) => handleSelec(el)}>
          <option value="sin filtro">All activities</option>
          {allActivities.map((act) => (
            <option value={act.name} key={act.name}>
              {act.name}
            </option>
          ))}
        </select>
      </div>
      <Paginado
        countriesPerPage={countriesPerPage}             //me traigo el paginado y le paso la cantidad de paises por pgina
        allCountries={allCountries.length}              //la cantidad de paises
        paginado={paginado}
      />
      <SearchBar />
      <div id="cardHome">
        {currentCountries?.map((e) => (      //mapeo la cantidad de paises por pagina
          <Card
            key={e.id}
            id={e.id}
            activities={e.activities}
            name={e.name}
            continents={e.continents}
            flags={e.flags}
            population={e.population}
          />
        ))}
      </div>
      <Paginado
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginado={paginado}
      />
      <button id="PaginadoPaginado" onClick={(e) => handlePrev(e)} disabled={currentPage <=1}>
        {" "}
        Prev{" "}
      </button>
      <button id="PaginadoPaginado"
        onClick={(e) => handleNext(e)}
        disabled={currentCountries.length >10}
      >
        {" "}
        Next{" "}
      </button>
    </div>
  );
}
