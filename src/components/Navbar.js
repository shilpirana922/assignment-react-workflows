const Navbar = ({workflowData, backToHomePage}) => {
    return (
     <nav className="navbar navbar-expand-sm bg-light border border_clr">
        <div className="container-fluid d-flex">
          <span><b>Workflow: {workflowData?workflowData.name :""}</b></span>
           {workflowData?< span onClick={backToHomePage} style={{cursor:"pointer"}}><b>Back</b></span> :""}
        </div>
      </nav>
    )
}
export default Navbar;

