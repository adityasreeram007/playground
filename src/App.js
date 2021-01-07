// import logo from './logo.svg';
import './App.css';
import React, { Component} from 'react';
import Boards from './components/Boards'
import Board from './Board'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Modal from "react-modal"
import { 
   
  Route, 
  BrowserRouter,
  Switch 
} from 'react-router-dom'; 
const cookies = new Cookies();
// var values=[{
//   date:"12 Dec 2020",
//   title:"Web development Prototype",
//   desc:"protyping the nessesary task",
//   left:4,
//   progress:"40%"

// },
// {
//   date:"14 Dec 2020",
//   title:"Wireframe Prototype",
//   desc:"Design Prototype",
//   left:12,
//   progress:"50%"

// },
// {
//   date:"15 Dec 2020",
//   title:"Deploy to heroku Prototype",
//   desc:"protyping the nessesary task and completing",
//   left:24,
//   progress:"20%"

// },
// {
//   date:"14 Dec 2020",
//   title:"Web development Prototype",
//   desc:"protyping the nessesary task",
//   left:4,
//   progress:"40%"

// },
// {
//   date:"12 Dec 2020",
//   title:"Web development Prototype",
//   desc:"protyping the nessesary task",
//   left:4,
//   progress:"40%"

// },
// {
//   date:"12 Dec 2020",
//   title:"Web development Prototype",
//   desc:"protyping the nessesary task",
//   left:4,
//   progress:"40%"

// }


// ]
class App extends Component {
  state={
    selected:null,
    add:false,
    del:false
    
  }
  toggleadd=()=>{
    if (this.state.add===false){
      this.setState({add:true})}
      else{
        this.setState({add:false})
      }
  }
  toggledel=()=>{
    if (this.state.del===false){
      this.setState({del:true})}
      else{
        this.setState({del:false})
      }
  }
  async addProject(){
    await axios.post("http://127.0.0.1:5000/addProject",{name:document.getElementById('pn').value,date:document.getElementById('pd').value,days:document.getElementById('days').value,desc:document.getElementById('desc').value})
    
    localStorage.removeItem('projects')
    console.log(localStorage.getItem('projects'))
    window.location.reload(false)
  
  }
  async delProject(){
    await axios.post("http://127.0.0.1:5000/delProject",{del:document.getElementById('dn').value})
    
    localStorage.removeItem('projects')
    console.log(localStorage.getItem('projects'))
    window.location.reload(false)
  
  }
    
  
  async checkvalid(c){
    var projects=JSON.parse(localStorage.getItem('projects'))
    if(c===0){
    var name=document.getElementById('pn').value;
    
    if(name.length <4){
      document.getElementById('valid').innerHTML="Minimum Length is 4"
      document.getElementById('addp').disabled = true
      return 
    }
    for (var x in projects){
      console.log(projects[x])
      if (projects[x].name===name){
        document.getElementById('valid').innerHTML="Not Available.Enter a Valid Name."
        document.getElementById('addp').disabled = true
        return 
      }
    }
    document.getElementById('valid').innerHTML="Valid Entry."
        document.getElementById('addp').disabled = false
  }
  else{
    var dname=document.getElementById('dn').value;
    document.getElementById('delp').disabled = true
    for (var o in projects){
      console.log(projects[o])
      if (projects[o].name===dname){
        document.getElementById('valid').innerHTML="Press Delete"
        document.getElementById('delp').disabled = false
        return 
      }
      else{
        document.getElementById('valid').innerHTML="InValid Entry."
        document.getElementById('delp').disabled = true
      }
    }
   
        
  }
  }
  async componentDidMount() {
    cookies.set('logged',true)
    cookies.set('user',"adityasreeram99")
    console.log(1)
    if(!localStorage.getItem('projects')){
    var value=await axios.post("http://127.0.0.1:5000/fetch",{})
    // console.log(value.data[0]['adityasreeram99-gmail-com']['projects'])
    console.log(value.data.data.projects)
    var arr=[]
    var sample=[]
    for(var x in value.data.data.projects){
      arr.push(value.data.data.projects[x])
      sample.push(value.data.data.projects[x].modules)
    }
    console.log(arr)
    console.log(sample)
    localStorage.setItem('projects',JSON.stringify(arr))
    localStorage.setItem('modules',JSON.stringify(sample))
    console.log(JSON.parse(localStorage.getItem('projects')))
  window.location.reload(false)
    }
      
    document.getElementById('len1').innerHTML=JSON.parse(localStorage.getItem('projects')).length
    document.getElementById('len').innerHTML=JSON.parse(localStorage.getItem('projects')).length
    document.getElementById("date").innerHTML=new Date().toDateString();
  console.log(new Date().toDateString())
   
  }
  async changeTheme(val){
    document.getElementById('rooter').style.backgroundColor=val
}
 
 async rightScroll(){
  var content=document.getElementById('boards');
  content.scrollLeft-=500;
  console.log("right")

}
async leftScroll(){
  var content=document.getElementById('boards');
  content.scrollLeft+=500;
  
}

  render(){
return (
        <main>
          <BrowserRouter>
          <Switch>
            <Route path="/:id">
            
              <Board data={this.state.selected}></Board>
            </Route>
          </Switch>
          </BrowserRouter>
          <Modal 
        isOpen={this.state.add}
        onRequestClose={this.toggleadd}
        contentLabel="My dialog" className="add"
      ><br></br>
      
<center>
        <div className="inp" >
        <p className="centertext">Add New Project</p>
          <input type="text" placeholder="Name" id="pn" name="uname" onKeyUp={()=>this.checkvalid(0)} class="form-control "></input><br></br>
          <p id="valid" className="valid">Enter a unique Project Name</p>
          <input type="text" placeholder="date ex: 2 jan 2020" id="pd" name="pass"  class="form-control  "></input><br></br>
          <input type="text" placeholder="DeadLine days" id="days" name="pass"  class="form-control  "></input><br></br>
          <input type="text" placeholder="description" id="desc" name="pass"  class="form-control  "></input><br></br>
          
          <button class="btw" id="addp" onClick={()=>this.addProject()}>Add Project</button><br></br>
          <button class="btw" onClick={this.toggleadd}>Cancel</button>
        </div></center>
        </Modal>
        <Modal 
        isOpen={this.state.del}
        onRequestClose={this.toggledel}
        contentLabel="My dialog" className="add"
      ><br></br>
      
<center>
        <div className="inp" >
        <p className="centertext">Delete Project</p>
          <input type="text" placeholder="Name" id="dn" name="uname" onKeyUp={()=>this.checkvalid(1)} class="form-control "></input><br></br>
          <p id="valid" className="valid">Enter a Existing Project Name</p>
        
          
          <button class="btw" id="delp" onClick={()=>this.delProject()}>Delete</button><br></br>
          <button class="btw" onClick={this.toggledel}>Cancel</button>
        </div></center>
        </Modal>




          {!localStorage.getItem('current')?
          <div>
          <nav>
            <div className="nav-item">
            <i class="fa fa-play"></i> PlAyGrOUnD
            </div>
            <div className="nav-item-right">
            {cookies.get('logged')?
            <div className="user">Welcome , {cookies.get('user')}</div>:
            <button className="navbtn">login</button>
            
            }
           
          

            </div>
            <div className="nav">
               <div className="themes">
                   <button Style="background-color:#4BBF6B;border-radius:50%;font-size:xx-large;margin-right:2%" onClick={()=>this.changeTheme("#4BBF6B")}>G</button>
                   <button Style="background-color:white;border-radius:50%;font-size:xx-large;margin-right:2%" onClick={()=>this.changeTheme("white")}>W</button>
                   <button Style="background-color:	#FF4500;border-radius:50%;font-size:xx-large;margin-right:2%" onClick={()=>this.changeTheme("#FF4500")}>O</button>
                   <button Style="background-color:	#7B68EE;border-radius:50%;font-size:xx-large;margin-right:2%" onClick={()=>this.changeTheme("#7B68EE")}>M</button>
            
               </div>
           </div>
          </nav>
          <div className="container">
          <div className="row">
            <span Style="float:left" >Dashboard</span>
            <span Style="float:right" id="date"></span>
            
            
            </div>
            <hr/>
            <div className="row" Style="padding:0%" >
            <span Style="float:left;margin-left:5%;" >Projects</span><br/>
            
            
            
            </div>
            
            <div className="row" Style="display:flex;" >
                <div className="details" ><span className="text" id="len1" Style="font-weight:bold;"></span><br/><span className="text">Total</span></div>
                <div className="details" ><span className="text" id="len"></span><br/><span className="text">Progress</span></div>
                <div className="details" ><span className="text">0</span><br/><span className="text">Completed</span></div>
                
            </div>
            
            <div className="row" >
            <span Style="float:left" >Boards</span>
            <button  className="btn-right" onClick={()=>this.toggleadd()}><i class="fa fa-plus"></i></button>
            <button  className="btn-right" onClick={()=>this.toggledel()}><i class="fa fa-minus"></i></button>
            <button  className="btn-right" Style="float:right" id="ls" onClick={()=>this.leftScroll()}><i class="fa fa-angle-right"></i></button>
            <button  className="btn-right" Style="float:right" id="rs" onClick={()=>this.rightScroll()}><i class="fa fa-angle-left"></i></button>
              
            </div>
            {/* JSON.parse(localStorage.getItem('projects')) */}
          <Boards boards={JSON.parse(localStorage.getItem('projects'))} cookie={cookies}></Boards></div>
          </div>:
          ""}

          <script>
          </script>
        </main>
)
  }
}
export default App;