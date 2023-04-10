import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { FETCH_MODULE_URL } from "../constants"

const Sidebar = () => {
  const [currentPage , setCurrentPage] = useState(1);
  const [postPerPage ] = useState(5);
  const [modules, setModules] = useState([])

  
  const onDragStart = (event, nodeData) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };


  const loadModules = async (page=1, limit=5) => {
    const response = await fetch(`${FETCH_MODULE_URL}?page=${page}&limit=${limit}`);
    const jsonData = await response.json();
    setModules(jsonData);
  }

  useEffect(()=>{
    loadModules(currentPage, postPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  useEffect(()=>{
    loadModules();
  }, [])

  return (
    <div className="list-nodes w-40 border-end h-300">
       <div className=' border p-2'>Modules</div>
      <div className='workflow-slide'>
    {modules.map((data) => (
      <div className=" workflow_container m-2 d-flex" key={data.id} style={{cursor: "grab"}} onDragStart={(event) => onDragStart(event, data)} draggable>
        <div className="workflow_inputype1  p-2 rounded-left text-uppercase">{data.input_type}</div>
        <div className="workflow_name  p-2 cursor-grab" >{data.name}</div>
        <div className=" workflow_inputype2  p-2 rounded-right text-uppercase">{data.output_type}</div>
      </div>))}
      <Pagination totalPosts={99} setCurrentPage={setCurrentPage}
     currentPage={currentPage}/>
     </div>
  </div>
  );
};

export default Sidebar;