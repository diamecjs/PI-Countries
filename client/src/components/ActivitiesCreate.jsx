import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { addActivities, filterCountriesByContinents, getActivities } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./styles/ActivitiesCreate.css";

function validate(input) {
  let errors = {};
  if ( !/^[a-zA-Z\s]*$/.test(input.name) || !input.name ||input.name.length < 3
  ) {  
    errors.name = "ingress a correct activity";
  } else if (!input.difficulty) {
    errors.difficulty = "ingress a correct difficulty";
  } else if (!input.duration) {
    errors.duration = "ingress a correct duration";
  } else if (!input.season) {
    errors.season = "ingress a correct season";
  } else if (!input.countries) {
    errors.countries = "Select a country";
  }
  return errors;
}

export default function ActivitiesCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  function handleChange(el) {
    setInput({
      ...input,
      [el.target.name]: el.target.value,
    });
    setErrors(
      validate({
        ...input,
        [el.target.name]: el.target.value,
      })
    );
  }
  function handleCheck(el) {
    if (el.target.checked) {
      setInput({
        ...input,
        [el.target.name]: el.target.value,
      });
      setErrors(
        validate({
          ...input,
          [el.target.name]: el.target.value,
        })
      );
    }
  }
  function handleSelec(el) {
    setInput({
      ...input,
      countries: [...input.countries, el.target.value],
    });
  }
  console.log(input)
 

  function handleSumit(el) {
    el.preventDefault();
    setErrors(validate(input));
    let error = validate(input);
    if (Object.values(error).length !== 0) {
    } else {
      dispatch(addActivities(input));
      alert("Activity Create");
      setInput({
        name: "",
        difficulty: [],
        duration: "",
        season: [],
        countries: [],
      });
      history.push("/home");
    }
  }


  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className="background">
      <form onSubmit={(el) => handleSumit(el)} className="formAddTourism">
        <h1>Create Activity</h1>
        <div>
          <label>Activities:</label>
          <input
            type="text"
            required
            value={input.name}
            name="name"
            onChange={(el) => handleChange(el)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Difficulty:</label>
          <label>
            <input
              type="radio"
              required
              name="difficulty"
              value="1"
              onChange={(el) => handleCheck(el)}
            />
            1
          </label>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="2"
              onChange={(el) => handleCheck(el)}
            />
            2
          </label>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="3"
              onChange={(el) => handleCheck(el)}
            />
            3
          </label>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="4"
              onChange={(el) => handleCheck(el)}
            />
            4
          </label>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="5"
              onChange={(el) => handleCheck(el)}
            />
            5
          </label>
          {errors.difficulty && <p>{errors.difficulty}</p>}
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="number"
            required
            min="1"
            max="12"
            value={input.duration}
            name="duration"
            onChange={(el) => handleChange(el)}
          />
          {errors.duration && <p className="error">{errors.duration}</p>}
        </div>
        <div>
          <label>season:</label>
          <label>
            <input
              type="radio"
              required
              name="season"
              value="summer"
              onChange={(el) => handleCheck(el)}
            />
            Summer
          </label>
          <label>
            <input
              type="radio"
              name="season"
              value="autumn"
              onChange={(el) => handleCheck(el)}
            />
            Autumn
          </label>
          <label>
            <input
              type="radio"
              name="season"
              value="winter"
              onChange={(el) => handleCheck(el)}
            />
            winter
          </label>
          <label>
            <input
              type="radio"
              name="season"
              value="Spring"
              onChange={(el) => handleCheck(el)}
            />
            Spring
          </label>
          {errors.season && <p className="error">{errors.season}</p>}
        </div>
        <select
          onChange={(el) => handleSelec(el)}
          defaultValue="Select Country"
        >
          <option>Select Country</option>
          {countries.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>

        <button className="submit">Crearte Activity</button>

        <Link to="/home">
          <button className="submit">Go back!</button>
        </Link>
      </form>
    </div>
  );
}
