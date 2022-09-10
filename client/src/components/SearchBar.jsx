import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions/index";
import "./styles/searchbar.css"
export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameCountries(name));
  }

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
      />
      <button id="search" type="submit" onClick={(e) => handleSubmit(e)}>
        Search...
      </button>
    </div>
  );
}
