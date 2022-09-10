import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Details.css";


export default function Detail() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(params.id));
  }, [dispatch,params.id]);



  const myCountry = useSelector((state) => state.detail);

  return (
    <div id="DetailDiv">
      <div>
        <Link to={"/home"}>
          <button id="BotonBack">Go back!</button>
        </Link>
      </div>

      <div>
        <div key={myCountry.id}>
          <div>
            <div></div>
            <div id="DetailCard">
              <h1 id="titulo">
                {myCountry.name} - {myCountry.id}
              </h1>
              <img
                id="imagen"
                src={myCountry.flags}
                alt={myCountry.name}
                width="400px"
                height="250px"
              ></img>
              <h3>Continents: {myCountry.continents}</h3>
              <h3>Capital: {myCountry.capital}</h3>
              <h3>Subregion: {myCountry.subregion}</h3>
              <h3>Area: {myCountry.area} km²</h3>
              <h3>Population: {myCountry.population} hab </h3>
            </div>
            <div>
              {myCountry.activities?.map((el) => {
                return (
                  <div id="activityCard">
                    <p>Name: {el.name}</p>
                    <p>Difficulty: {el.difficulty}</p>
                    <p> Duration: {el.duration}</p>
                    <p>Season: {el.season}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
