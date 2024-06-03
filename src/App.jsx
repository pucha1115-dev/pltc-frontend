import Agent from "./pages/Agent.jsx";
import Modem from "./pages/Modem.jsx";
import Sim from "./pages/Sim.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";

function App() {
  return (<Router>
    <Routes>
      <Route path="/" element={<Agent/>} />
      <Route path="/sim"  element={<Sim/>} />
      <Route path="/modem"  element={<Modem/>} />
      <Route path="*"  element={<Modem/>} />
    </Routes>
    </Router>)
  
}

export default App;
