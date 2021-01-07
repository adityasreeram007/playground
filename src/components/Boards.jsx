import React from 'react'
// import { Link, Redirect } from 'react-router-dom'

// const colors=['#000','#000','#000','#000','#000','#000','#000','#000','#000','#000','#000','#000','#000']

const toBoard=({name,cookie})=>{
    console.log(name)
   localStorage.setItem('current',name)
   var value=JSON.parse(localStorage.getItem('projects'))
  
   for (var x in value){
       console.log(value[x].name)
       if(value[x].name===name){
           
           
           localStorage.setItem('currentmod',JSON.stringify(value[x].modules))
           break
       }
   }
   console.log(localStorage.getItem(JSON.parse(localStorage.getItem('currentmod'))))
   window.location.replace("http://127.0.0.1:3001/"+name)

}
const Boards=({ boards,cookie }) => {
    console.log(boards)
    return (
       
           

          
            
      
            <div className="grid" id="boards">{
                 boards && boards.map(({ date,name,desc,left,progress }, index) =>
                <div className="grid-item" id={name} onClick={()=>toBoard({name},cookie)}>
              
                    <div className="top" >
                    <div Style="color:white;padding:4%;font-size:20px;margin-top:10px;">{date}</div>
                        <div Style="color:white;font-size:xx-large;;">{name}</div>
                        <div className="description">{desc}</div>
                        <div Style="color:white;padding:4%;font-size:20px;">days left {left}</div>
                        
                        <div className="description">Percentage of Work Done {progress}</div>
                    </div>
                   
                      

                    
                </div>
               )}
            </div>

       
           
          
      
    )
}

export default Boards