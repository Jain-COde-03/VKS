/* eslint-disable react-hooks/set-state-in-effect */
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./Pages/Home/Home"
import React from "react";
import { useState } from "react";
import axios from "axios";

const MyContext = React.createContext();

function App() {

  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [adress, setAdress] = useState("");

  const apiKey = import.meta.env.VITE_POSITIONSTACK_API_KEY;

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://countriesnow.space/api/v0.1/countries/flag/images");
      const countries = response.data.data.map((country) => ({
        flag: country.flag,
        name: country.name,
      }));
      setCountryList(countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchCity = async (country) => {
    try {
      const response = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", { country });
      setCityList(response.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };

  const fetchAdress = async (long, lat) => {
    try {
      const response = await axios.get("https://api.positionstack.com/v1/reverse", {
        params: {
          access_key: apiKey,
          query: `${lat},${long}`,
          limit: 1,
        },
      });

      const data = response.data?.data?.[0];
      if (!data) {
        throw new Error("No reverse geocode data returned");
      }

      const label = data.label || `${data.locality || data.region || data.country}`;
      setAdress(label);

      const country = data.country;
      if (country) {
        setSelectedCountry(country);
        fetchCity(country);
      }

      return label;
    } catch (error) {
      console.error("Error fetching address:", error);
      return "";
    }
  };

  React.useEffect(() => {
    fetchCountries();
  }, []);

  React.useEffect(() => {
    if (selectedCountry) {
      fetchCity(selectedCountry);
    } else {
      setCityList([]);
    }
  }, [selectedCountry]);



  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={{ countryList, setCountryList, selectedCountry, setSelectedCountry, cityList, setCityList, fetchCity, fetchAdress, adress, setAdress }}>
          <Routes>
            <Route path="/" exact={true} element={<Home />} />
            <Route path="/help" exact={true} element={<div>Help Center Page</div>} />
            <Route path="/track" exact={true} element={<div>Order Tracking Page</div>} />
          </Routes>
        </MyContext.Provider>
      </BrowserRouter>

    </>
  )
}

export { MyContext };
export default App
