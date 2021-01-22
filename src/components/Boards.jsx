import React from 'react'
// import { Link, Redirect } from 'react-router-dom'
import Board from '../Board'
import App from '../App'

import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
// var state={value:null}

const Boards = ({ boards, cookie,action,display }) => {
    
    return (
    <Router>
            {/* <Link to={routex}/>
            <Switch>
                    <Route path="/:id">
                    
                      <Board data={name}></Board>
                    </Route>
                  </Switch> */}
           




<div className="grid" id="boards" Style={display}>
  
  {boards &&
    boards.map(({ date, name, desc, left, progress }, index) => (
        <Link to={"/board/"+name}>
      <div
        className="grid-item1"
        id={name}
        onClick={() => action()}
      >
        <div className="top">
          <div Style="color:white;padding:4%;font-size:20px;margin-top:10px;">
            
            {date}
          </div>
          <div Style="color:white;font-size:xx-large;;"> {name} </div>
          <div className="description"> {desc} </div>
          <div Style="color:white;padding:4%;font-size:20px;">
            
            days left {left}
          </div>
          <div className="description">
            
            Percentage of Work Done {progress}
          </div>
        </div>
      </div></Link>
    ))} 
</div>
<Switch>
                    <Route  path="/board/:id" render={(props)=><Board action={action} />}/>
                    {display==="display:none"?
                    <Route  path="/" render={()=><App/>}/>: ""
                    
                      }
                     
                    
                      
                    
                  </Switch> 
</Router>



    )
}

export default Boards