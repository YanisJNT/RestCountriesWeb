import {Routes,Route} from "react-router-dom"

import './App.css';
import Header from "./components/Header"
import Home from "./components/Home"
import InfoPays from "./components/InfoPays"


function App() {

  
  return (
    <div className="App">
      <Header  />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/pays/:id" element={<InfoPays />} />
      </Routes>
    </div>
  );
}

export default App;
