import React from 'react'
import { Link, Switch,Route,BrowserRouter as Router } from 'react-router-dom'

// const colors=['#000','#000','#000','#000','#000','#000','#000','#000','#000','#000','#000','#000','#000']

const Modules=({ modules,add,del,addpin,delpin,getpinname,addpinfunc,delpinfunc }) => {
    console.log("modules "+modules)
   
    
    
    if(modules!==undefined){
    return (
        
       
            <div className="container" >
                <Router>
            <div className="grid-container" id="modules">{
                 modules && modules.map(({ name,submodules }, index) =>
                 
                <div className="grid-item" id={name}>
                       <div Style="float:left;color:black;font-weight:bold;font-size:x-large;">{name}</div><Link to={"/addpin/"+name}><button  className="btn-right" onClick={addpin}><i class="fa fa-plus"></i></button></Link>
           <Link to={"/delpin/"+name}><button  className="btn-right" onClick={delpin}><i class="fa fa-minus"></i></button></Link><br/><br/>
                    <div className="top1" >{

                submodules && submodules.map(({val},index)=>
                    <div className="subs">
                        <div className="indata">
                        {val}
                        </div>
                        </div>
                   
                )}
                      </div> 

                    
                </div>
               )}
            </div>
            <Switch>
                        <Route path="/addpin/:id">
                          {add===true? 
                        <div  className="modal" id="addmodal" >
          
          
          

          <div className="inp" >
          <span class="close" Style="float:right" onClick={addpin}>&times;</span>
          <p className="centertext" >Add New Pin</p>
            <input type="text" placeholder="Name" id="pn" name="uname" onKeyUp={getpinname}  class="form-control "></input><br></br>
            <p id="valid" className="valid"></p>
            
            
            <button class="btw" id="addp" onClick={addpinfunc}>add</button><br></br>
            
          </div>
  
            </div>:""} 
                        </Route>
                        <Route path="/delpin/:id">
                          {del===true? 
                        <div  className="modal" id="addmodal" >
          
          
          

          <div className="inp" >
          <span class="close" Style="float:right" onClick={delpin}>&times;</span>
          <p className="centertext" >Delete Pin</p>
            <input type="text" placeholder="Name" id="pn" name="uname" onKeyUp={getpinname}  class="form-control "></input><br></br>
            <p id="valid" className="valid"></p>
            
            
            <button class="btw" id="addp" onClick={delpinfunc}>Delete</button><br></br>
            
          </div>
  
            </div>:""} 
                        </Route>
            </Switch>
            </Router>
            </div>

           
           
          
      
    )}
    else{
        return (
           <center><div className="msg" >Add Modules</div></center> 
        )
    }
}

export default Modules