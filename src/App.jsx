import Agent from "./pages/Agent.jsx";
import ModemCreate from "./pages/ModemCreate.jsx";
import SimCreate from "./pages/SimCreate.jsx";
import AgentMaster from "./pages/AgentMaster.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SimMasterList from "./pages/SimMasterList.jsx";
import AgentMasterList from "./pages/AgentMasterList.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import MainPage from "./pages/MainPage.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import { Flex } from "@chakra-ui/react";
import RofPage from "./pages/RofPage.jsx";
import ModemMasterList from "./pages/ModemMasterList.jsx";
import SimUpdate from "./pages/SimUpdate.jsx";
import ModemUpdate from "./pages/ModemUpdate.jsx";
import AgentViewPage from "./pages/AgentViewPage.jsx";
function App() {
  return (
    <Router>
      <Flex flexDir="row" w="100vw">
        <Sidebar />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/agent_master_list" element={<AgentMasterList />} />
          <Route path="/modem_master_list" element={<ModemMasterList />} />
          <Route path="/agent_info" element={<AgentMaster />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/agent_view" element={<AgentViewPage />} />
          <Route path="/sim_create" element={<SimCreate />} />
          <Route path="/sim_update" element={<SimUpdate />} />
          <Route path="/modem" element={<ModemCreate />} />
          <Route path="/modem_update" element={<ModemUpdate />} />
          <Route path="/sim_master_list" element={<SimMasterList />} />
          <Route path="/rof" element={<RofPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Flex>
    </Router>
  );
}

export default App;
