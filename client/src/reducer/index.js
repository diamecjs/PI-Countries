const initialState = {
  allCountries: [],
  countries: [],
  activities: [],
  detail:{},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case "GET_NAME_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };

    case "POST_ACTIVITIES":
      return {
        ...state,
      };

    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };

      case "GET_DETAILS":
        return{
            ...state,
            detail: action.payload 
        }
   
    //----------------------------------------------------FILTROS---------------------------------------------------------------------
    case "FILTER_BY_CONTINENTS":
      
      const continentsFiltered =
        action.payload === "AllContinents"
          ? state.allCountries
          : state.allCountries.filter((el) => action.payload === el.continents);
      return {
        ...state,
        countries: continentsFiltered,
      };

    case "ORDER_BY_NAME":
      let sortArr =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortArr,
      };

    case "ORDER_BY_POPULATION":
      let sortArr2 =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortArr2,
      };

    default: {
      return state;
    }

    case "FILTER_CREATED":
      let filter =
        action.payload === "sin filtro"
          ? state.allCountries
          : state.allCountries.filter((country) => {
              const activities = country.activities.map((a) => a.name);
              return activities.includes(action.payload);
            });

      return {
        ...state,
        countries: filter,
      };
  }
}

export default rootReducer;
