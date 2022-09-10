import React from "react";
import "./styles/Card.css";
import { Link } from "react-router-dom";

export default function Card({
  flags,
  name,
  continents,
  activities,
  difficulty,
  duration,
  season,
  id,
}) {
  return (
    <div>
      <div id="cardCard">
        <h3>{name}</h3>
        <img src={flags} alt="Flags not found" width="250px" height="125px" />
        <h5>Continents: {continents}</h5>

        <div>
          <Link to={`/details/${id}`}>
            <button id="MoreInfo">More information..</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
