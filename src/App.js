import {Routes,Route} from "react-router-dom"

import './App.css';
import Header from "./components/Header"
import Home from "./components/Home"
import InfoCountry from "./components/InfoCountry"


function App() {

  
  return (
    <div className="App">
      <Header  />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/pays/:id" element={<InfoCountry />} />
      </Routes>
    </div>
  );
}

export default App;
