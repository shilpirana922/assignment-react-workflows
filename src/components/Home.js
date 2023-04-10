import React from "react";
import "../App.css";

const Home = ({workflows, setWorkflowId}) => {
const handleId = (id) => {
    setWorkflowId(id)
}
 return(<div className="container-fluid p-0 m-2">
<table className="table table-striped table-bordered p-2 w-50  text-bold">
  <thead className = "table_head text-white">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Input Type</th>
      <th scope="col">Created at</th>
    </tr>
  </thead>
  <tbody className= "table-primary">
     { workflows.map((workflow, index)=>(
      <tr key={index}>
      <td className="text-decoration-underline" onClick={()=>handleId(workflow.id)}>{workflow.name}</td>
      <td>{workflow.input_type}</td>
      <td>{workflow.createdAt}</td>
    </tr>
     ))} 
  </tbody>
</table>
   
    </div>
    )

}

export default Home;