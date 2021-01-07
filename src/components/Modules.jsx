import React from 'react'
// import { Link, Redirect } from 'react-router-dom'

// const colors=['#000','#000','#000','#000','#000','#000','#000','#000','#000','#000','#000','#000','#000']

const Modules=({ modules }) => {
    console.log(modules)
    if(modules!==undefined){
    return (
       
            <div className="container" >
                
            <div className="grid1" id="modules">{
                 modules && modules.map(({ name,submodules }, index) =>
                 
                <div className="grid-item1" id={name}>
                       <div Style="float:left;color:black;font-weight:bold;font-size:x-large;">{name}</div><button  className="btn-right"><i class="fa fa-plus"></i></button>
            <button  className="btn-right"><i class="fa fa-minus"></i></button><br/><br/>
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
            </div>

           
           
          
      
    )}
    else{
        return (
           <center><div className="msg" >Add Modules</div></center> 
        )
    }
}

export default Modules