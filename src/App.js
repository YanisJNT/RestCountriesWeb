import {Routes,Route} from "react-router-dom"

import logo from './logo.svg';
import './App.css';
import Header from "./components/Header"
import Home from "./components/Home"
import axios from "axios";
import { useState } from 'react';


function App() {
  const [search, setsearchState] =  useState("")
  const [responseData,setResponseData] = useState()

  const setSearch = (value) => {
    setsearchState(value)
    console.log(value)
  }

  const loadData = async () => {
    setResponseData()
    try{
      const response =  await axios.get(`https://restcountries.com/v3.1/name/${search}`)
      await setResponseData(response.data)
  
    }

    catch(error){
      console.log(error)
      setResponseData()
    }

  }



  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home setSearch={setSearch} loadData={loadData} response={responseData} />} />
      </Routes>
      
    </div>
  );
}

export default App;
