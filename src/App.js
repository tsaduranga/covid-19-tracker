import React, { useState, useEffect } from 'react';
import { Card, CardContent, FormControl, MenuItem, Select } from '@mui/material';
import './App.css';
import axios from 'axios';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table'
import { sortData } from './components/utile';
import LineGraph from './components/LineGraph';

function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
 
  useEffect( async ()=>{
    const { data } = await axios.get('https://disease.sh/v3/covid-19/all')
    setCountryInfo(data)
  },[])


  
  useEffect(  () => {

    const getCountriesData = async () => {

      const { data } = await axios.get("https://disease.sh/v3/covid-19/countries")

      // console.log(data)

      const countries = data.map((country) => (
        {
          name: country.country,
          value: country.countryInfo.iso2
        }
      ))

      const sortedData = sortData(data)
      setTableData(sortedData)
      setCountries(countries) 

    }

    getCountriesData()

  }, [])


  const onCountryChange = async (e) => {
    const country = e.target.value
    setCountry(country)

    const url = country === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' 
                        : `https://disease.sh/v3/covid-19/countries/${country}`

  try {

    const { data } = await axios.get(url)

    setCountryInfo(data)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  
    
  }



  return (
    <div className="App">

      <div className='app__left'>
        <div className="app__header">

          <h1>Covid 19 Tracker </h1>


          <FormControl className="app__dropdown">
            <Select variant='outlined' value={country} onChange={onCountryChange}  >

              <MenuItem value='worldwide'>World Wide</MenuItem>

              {
                countries.map((country) => (
                  <MenuItem value={country.value} >{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>


        </div>


        <div className="app_stats">

          <InfoBox title='Corona Virus Cases' total={countryInfo.todayCases} cases={countryInfo.cases} />

          <InfoBox title='Recoverd' total={countryInfo.todayRecovered} cases={countryInfo.recovered} />

          <InfoBox title='Deaths' total={countryInfo.todayDeaths} cases={countryInfo.deaths} />

        </div>

        <Map />

      </div>

      <Card className="app__right">
          <CardContent>
              
              <h3>Live Cases By Country</h3>
              <Table countries={tableData}  />

              <h3>WorldWide New Cases</h3>
              <LineGraph />

          </CardContent>
      </Card>


    </div>





  );
}

export default App;
