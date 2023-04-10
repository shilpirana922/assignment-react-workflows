import React, {useEffect, useState} from "react";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import {FETCH_WORKFLOWS_URL} from "./constants";
import Home from "./components/Home";
import DesignWorkflow from "./components/DesignWorkflow";
import {FETCH_INDIVIDUAL_WORKFLOW} from "./constants"

const App = () => {
  const [workflows, setWorkflows]  = useState([]);
  const [worflowId, setWorkflowId] = useState(null);
  const [workflowData, setWorkflowData]  = useState(null);

    
  const fetchWorkflows = async () =>{
    const response = await fetch(FETCH_WORKFLOWS_URL);
    const jsonData = await response.json();
    setWorkflows(jsonData);
  }

  const getWorkflowData = async (id) => {
    const response = await fetch(FETCH_INDIVIDUAL_WORKFLOW+id);
    const jsonData = await response.json();
    setWorkflowData(jsonData);
  } 

  const backToHomePage = () => {
    setWorkflowId(null);
    setWorkflowData(null);
  }

   useEffect(()=>{
    if(worflowId){
      getWorkflowData(worflowId);
    }
   }, [worflowId])

  useEffect(() => {
    fetchWorkflows();
  }, [])

  return (
    <div className="container-fluid p-0 m-0">
    <Navbar workflowData={workflowData} backToHomePage={backToHomePage}/>
    { !worflowId? (
      <>
     <Home workflows={workflows} setWorkflowId={setWorkflowId}/>
     </>
     ): <DesignWorkflow id={worflowId}/>
    }
    </div>
  );
}

export default App;
