import Agent from "./pages/Agent.jsx";
import Modem from "./pages/Modem.jsx";
import Sim from "./pages/Sim.jsx";
import AgentMaster from "./pages/AgentMaster.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import SimMasterList from "./pages/SimMasterList.jsx";
import AgentMasterList from "./pages/AgentMasterList.jsx";
import 

function App() {
  const [data, setData] = useState({});
  return (<Router>
    <Routes>
      <Route path="/agent_info/:id" element={<AgentMaster/>} />
      <Route path="/" element={<AgentMasterList/>} />
      <Route path="/agent"  element={<Agent/>} />
      <Route path="/sim"  element={<Sim/>} />
      <Route path="/modem"  element={<Modem/>} />
      <Route path="/sim_master_list" element={<SimMasterList/>} />
      <Route path="*"  element={<Modem/>} />
    </Routes>
    </Router>)
  
}

export default App;
