import React from "react";
import { Handle, Position } from "reactflow";
import {FaArrowAltCircleRight} from "react-icons/fa";


const CustomNode = ({ data}) => {

  return (
    <div className="text-updater-node">
      {data.label.input_type ?
      <Handle
        type="target"
        position={Position.Top}
        
      /> :""
      }


      <div className={`workflow_container d-flex ${ data.label.connected ? "":"border border-2 border-danger"}`}>
        <div className="workflow_inputype1  p-2 rounded-left text-uppercase bg-white"> {data.label.input_type ?
      data.label.input_type:<FaArrowAltCircleRight/>
      }</div>
        <div className="workflow_name  p-2 cursor-grab" >{data.label.name}</div>
        <div className=" workflow_inputype2  p-2 rounded-right text-uppercase bg-white">{data.label.output_type}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
}

export default CustomNode;
