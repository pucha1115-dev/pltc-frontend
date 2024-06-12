import Agent from "./pages/Agent.jsx";
import Modem from "./pages/Modem.jsx";
import Sim from "./pages/Sim.jsx";
import AgentMaster from "./pages/AgentMaster.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SimMasterList from "./pages/SimMasterList.jsx";
import AgentMasterList from "./pages/AgentMasterList.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import MainPage from './pages/MainPage.jsx'
import Sidebar from "./components/sidebar/Sidebar.jsx";
import { Flex } from "@chakra-ui/react";
import RofPage from "./pages/RofPage.jsx";


function App() {
  return (
    <Router>
      <Flex flexDir='row' w='100vw'>
      
      <Sidebar/>
  
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/agent_master_list" element={<AgentMasterList />} />
        <Route path="/agent_info" element={<AgentMaster />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/sim" element={<Sim />} />
        <Route path="/modem" element={<Modem />} />
        <Route path="/sim_master_list" element={<SimMasterList />} />
        <Route path="/rof" element={<RofPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Flex>
    </Router>
  );
}

export default App;
