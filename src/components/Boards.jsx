import React from 'react'
// import { Link, Redirect } from 'react-router-dom'
import Board from '../Board'
// const colors=['#000','#000','#000','#000','#000','#000','#000','#000','#000','#000','#000','#000','#000']
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
const toBoard = ({ name, cookie }) => {
    console.log(name)
    localStorage.setItem('current', name)
    var value = JSON.parse(localStorage.getItem('projects'))

    for (var x in value) {
        console.log(value[x].name)
        if (value[x].name === name) {


            localStorage.setItem('currentmod', JSON.stringify(value[x].modules))
            break
        }
    }
    console.log(localStorage.getItem(JSON.parse(localStorage.getItem('currentmod'))))
    
   

}
const Boards = ({ boards, cookie }) => {
    console.log(boards)
    return (
    <Router>
            {/* <Link to={routex}/>
            <Switch>
                    <Route path="/:id">
                    
                      <Board data={name}></Board>
                    </Route>
                  </Switch> */}
           




<div className="grid" id="boards">
  
  {boards &&
    boards.map(({ date, name, desc, left, progress }, index) => (
        <Link to={name}>
      <div
        className="grid-item"
        id={name}
        onClick={() => toBoard({ name }, cookie)}
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
                    <Route path="/:id">
                    
                      <Board data={null}></Board>
                    </Route>
                  </Switch> 
</Router>



    )
}

export default Boards