import React, { useState, useCallback, useRef, useEffect} from "react";
import {v4 as uuid} from "uuid";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider
} from "reactflow";
import 'reactflow/dist/style.css';
import Sidebar from "./Sidebar";
import CustomNode from "./CustomNode";

const nodeTypes = { customnode: CustomNode };

const DesignWorkflow = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
 
  const [nodes, setNodes, onNodesChange] = useNodesState([{
    id: "1",
    type: "customnode",
    data: {
     label:    {
      createdAt: "2023-04-07T05:30:15.521Z",
      name: "Input",
      output_type: "A",
      connected:true
     }
    },
    position: { x: 10, y: 10 }
  }]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [connectedNodes, setConnectedNodes] = useState(new Set());
  const [elements, setElements] = useState([]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            //   color: '#F0F8FF',
            },
            style: {
                // strokeWidth: 2,
                // stroke: '#F0F8FF',
              }
          },
          eds
        )
      ),
    [setEdges]
  );
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      }, []);

      const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          const nodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
          // check if the dropped element is valid
          if (typeof nodeData === 'undefined' || !nodeData) {
            return;
          }
    
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          });
          const newNode = {
            id:  uuid(),
            type:'customnode',
            position,
            data: { label: nodeData },
          };
    
          setNodes((nds) => nds.concat(newNode));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [reactFlowInstance]
      );

      // Listen to onConnect event
  const handleConnect = (params) => {
    onConnect(params);
    const targetId = params.target;
    setConnectedNodes((prevNodes) => new Set([...prevNodes, targetId]));
    setElements((prevElements) => [...prevElements, params]);
  }

  // Check if a node with `id` is connected to an edge
  const isNodeConnected = (id) => {
    return connectedNodes.has(id);
  }

  useEffect(()=>{
    setNodes((nds)=>(nds.map((node)=>{
        const obj = node.data.label;
        
        if(isNodeConnected(node.id)){
            console.log("foudn connected:",node)
        obj['connected'] = true;
        }
        
        return {
            ...node,
            data: {
              label:obj
            },
          };
    })))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[elements])

  return (<>
    <div className="d-flex flex-row w-100 vh-100">

    <Sidebar/>

      <div className="flow-designer w-50 dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
         
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          elements={elements}
          onConnect={handleConnect}
        >
          <Controls />
          <Background color="#ADD8E6" gap={16} size={2}/>
        </ReactFlow>
        </div>
        </ReactFlowProvider>
      </div>
    </div>
    
  </>);
}

export default DesignWorkflow;