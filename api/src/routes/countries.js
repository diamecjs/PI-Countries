const { Router } = require("express");
const axios = require("axios");
const { Country, Activity } = require("../db.js");
const router = Router();

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://restcountries.com/v3/all");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      id: el.cca3,
      name: el.name.common,
      flags: el.flags[1],
      continents: el.continents[0],
      capital: el.capital ? el.capital[0] : "No has capital",
      subregion: el.subregion,
      area: el.area,
      population: el.population,
    };
    
  });
   return apiInfo;
};
const getDbInfo = async () => {
  return await Country.findAll({
    include: {
      model: Activity,
      attributes:['name', 'difficulty', 'duration','season']
    }
  });
};

const getAllCountries = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = dbInfo.concat(apiInfo);
  return infoTotal;
};

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let countriesTotal = await getAllCountries();

  if (id) {
    let countriesId = await countriesTotal.find(
      (el) => el.id.toLowerCase() === id.toLowerCase()
    );
    countriesId
      ? res.status(200).json(countriesId)
      : res.status(404).send("The country was not found");
  }
});

router.get("/", async (req, res) => {
  
  let allCountries = await Country.findAll({ include: Activity }); 

  const name = req.query.name;

  if (!allCountries.length) {
    allCountries = await getApiInfo();
    await Country.bulkCreate(allCountries);
  }
  if (name) {
    let countriesName = allCountries.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    return countriesName.length
      ? res.status(200).send(countriesName)
      : res.status(404).send("The country was not found");
  }
  return res.status(200).json(allCountries);
});
module.exports = router;
