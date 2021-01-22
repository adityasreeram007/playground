// import logo from './logo.svg';
import './App.css';
import React, { Component} from 'react';
import Boards from './components/Boards'
import Board from './Board'
import Cookies from 'universal-cookie';
import axios from 'axios'
// import Modal from "react-modal"
import { 
   
  Route, 
  BrowserRouter as Router,
  Switch ,Link
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
    del:false,
    projectname:"",
    description:"",
    date:"",
    deadline:"",
    valid:"Enter a unique Project Name",
    validd:"Enter a Existing Project Name",
    flag:0,
    todate:new Date().toDateString(),
    disable:false,
    addmodal:false,
    projects:null,
    modules:null,
    len:0,
    len1:0,
    visible:true
  
    
  }
  constructor(props){
    super(props)
    this.action=this.action.bind(this);
    
  }
  action=(l)=>{
    if(l===1){
      this.setState({visible:true})
      return
    }
    else{
    if(this.state.visible===true){
    this.setState({visible:false})}
    else{
      this.setState({visible:true})
    }}
  }
  getprojectname=event=>{
    this.setState({projectname:event.target.value});
    this.checkvalid(0,event.target.value)
  }
  getdelprojectname=event=>{
    
    this.setState({projectname:event.target.value});
    this.checkvalid(1,event.target.value)
  }
  getdate=event=>{
    this.setState({date:event.target.value})
  }
  getdesc=event=>{
    this.setState({description:event.target.value})
  }
  getdeadline=event=>{
    this.setState({deadline:event.target.value})
  }
  toggleadd=()=>{
    console.log(window.location.pathname)
    
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
    await axios.post("http://127.0.0.1:5000/addProject",{name:this.state.projectname,date:this.state.date,days:this.state.deadline,desc:this.state.description})
    
    this.getvalues()
    this.toggleadd()
  
  }
  async delProject(){
    await axios.post("http://127.0.0.1:5000/delProject",{del:this.state.projectname})
    
    this.getvalues()
    this.toggledel()
  
  }
    
  
  async checkvalid(c,projectname){
    var projects=this.state.projects
    if(c===0){
    var name=projectname;
    
    if(name.length <4){
      this.state.valid="Minimum Length is 4"
      this.state.disable= true
      return 
    }
    for (var x in projects){
      console.log(projects[x])
      if (projects[x].name===name){
        this.state.valid="Not Available.Enter a Valid Name."
        this.state.disable= true
        return 
      }
    }
    this.state.valid="Valid Entry."
    this.state.disable= false
  }
  else{
    var dname=projectname;
    this.state.disable = true
    for (var o in projects){
      console.log(projects[o])
      if (projects[o].name===dname){
        this.state.validd="Press Delete"
        this.state.disable= false
        return 
      }
      else{
        this.state.validd="InValid Entry."
        this.state.disable = true
      }
    }
   
        
  }
  }
  getvalues(){
  
  axios.post("http://127.0.0.1:5000/fetch",{}).then(value=>{

  var arr=[]
  var sample=[]
  
  for(var x in value.data.data.projects){
   
    arr.push(value.data.data.projects[x])
    sample.push(value.data.data.projects[x].modules)
  }
  this.setState({projects:arr})
  this.setState({modules:sample})
 console.log(this.state.projects)

   
  this.setState({len:arr.length})
  this.setState({len1:arr.length})})
  }
  componentDidMount() {
    console.log(window.performance)
    if(performance.navigation.type === 1){
      console.log("reload")
      window.location.href="http://127.0.0.1:3000/"
     
     }
    if(window.location.pathname.length>1 && window.location.pathname[1]==='b'){
      console.log("windowpathx"+window.location.pathname.length)
      
    }
    
    
      console.log("windowpath"+window.location.pathname.length)
    

  console.log("app values"+this.state.visible)
    cookies.set('logged',true)
    cookies.set('user',"adityasreeram99")
    console.log(2)
   
    this.getvalues();
    
   
   
  console.log(new Date().toDateString())
   
  }
  
  componentDidUpdate(){
    console.log(window.location.pathname)
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
componentWillMount(){
  window.onpopstate = (event) => {
    // if (window.location.pathname==='/addproject' || window.location.pathname==='/delproject' ) {
      this.setState({add:false,del:false})
    // }
  };
  
}

  render(){
   
return (
        <main id="app">
         
         
         
      <Router>
        <Switch>
          <Route path="/board/:id" render={(props)=><Board action={this.action}/>}/>
        </Switch>
      </Router>

          {/* <Modal 
        isOpen={this.state.add}
        onRequestClose={this.toggleadd}
        contentLabel="My dialog" className="add"
      ><br></br>
      
<center>
        <div className="inp" >
        <p className="centertext">Add New Project</p>
          <input type="text" placeholder="Name" id="pn" name="uname"  onKeyUp={this.getprojectname} class="form-control "></input><br></br>
          <p id="valid" className="valid">{this.state.valid}</p>
          <input type="text" placeholder="date ex: 2 jan 2020" id="pd" onKeyUp={this.getdate} name="pass"  class="form-control  "></input><br></br>
          <input type="text" placeholder="DeadLine days" id="days" onKeyUp={this.getdeadline} name="pass"  class="form-control  "></input><br></br>
          <input type="text" placeholder="description" id="desc" onKeyUp={this.getdesc} name="pass"  class="form-control  "></input><br></br>
          
          <button class="btw" id="addp" onClick={()=>this.addProject()} disabled={this.state.disable}>Add Project</button><br></br>
          <button class="btw" onClick={this.toggleadd}>Cancel</button>
        </div></center>
        </Modal> */}
{/* <div  className="modal" id="addmodal" Style={this.state.welcome}>
<p Style="text-align:center;font-size:xx-large">Welcome to PlayGround</p>
<button>Load your Boards</button>
</div> */}



      
          



          {this.state.visible?
          <div>
            <div className="container">
          <nav className="nav">
            <div className="nav-item">
            <i class="fa fa-play"></i> PlAyGrOUnD
            </div>
            <div className="nav-item-right">
           
            <div className="lefter">  Welcome , {cookies.get('user')}</div>
            
            
            
           
          

            <div className="lefter">
               
                   <button Style="background-color:#4BBF6B;border-radius:50%;font-size:xx-large;" onClick={()=>this.changeTheme("#4BBF6B")}>G</button>
                   <button Style="background-color:white;border-radius:50%;font-size:xx-large;" onClick={()=>this.changeTheme("white")}>W</button>
                   <button Style="background-color:	#FF4500;border-radius:50%;font-size:xx-large;" onClick={()=>this.changeTheme("#FF4500")}>O</button>
                   <button Style="background-color:	#7B68EE;border-radius:50%;font-size:xx-large;;" onClick={()=>this.changeTheme("#7B68EE")}>M</button>
            
               </div>
           </div>
          </nav></div>
          
          <div className="container" Style="margin-top:2%;margin-bottom:2%;">
          <div className="row">
            <span  >Dashboard</span>
            <span className="date" id="date">{this.state.todate}</span>
            
            
            </div>
            
            <div className="row" Style="margin-top:0px;" >
            <span  >Projects</span>
            
            
            
            </div>
            
            <div className="row2"  >
                <div className="details" ><span className="text" id="len1" Style="font-weight:bold;">{this.state.len}</span><br/><span className="text">Total</span></div>
                <div className="details" ><span className="text" id="len">{this.state.len}</span><br/><span className="text">Progress</span></div>
                <div className="details" ><span className="text">0</span><br/><span className="text">Completed</span></div>
                
            </div>
            
            <div className="row" >
            <span  >Boards</span>
            
            <Router>
            
              <Link to="/addproject">
            <button  className="btn-right" onClick={this.toggleadd}><i class="fa fa-plus"></i></button></Link>
            <Link to="/deleteproject">
            <button  className="btn-right" onClick={()=>this.toggledel()}><i class="fa fa-minus"></i></button></Link>
            <Switch>
              <Route  path="/addproject">
             {this.state.add===true ?<div  className="modal" id="addmodal" Style={this.state.add}>
          
          
          

          <div className="inp" >
          <span class="close"  onClick={this.toggleadd}>&times;</span>
          <p className="centertext" >Add New Project</p>
            <input type="text" placeholder="Name" id="pn" name="uname"  onKeyUp={this.getprojectname} class="form-control "></input><br></br>
            <p id="valid" className="valid">{this.state.valid}</p>
            <input type="text" placeholder="date ex: 2 jan 2020" id="pd" onKeyUp={this.getdate} name="pass"  class="form-control  "></input><br></br>
            <input type="text" placeholder="DeadLine days" id="days" onKeyUp={this.getdeadline} name="pass"  class="form-control  "></input><br></br>
            <input type="text" placeholder="description" id="desc" onKeyUp={this.getdesc} name="pass"  class="form-control  "></input><br></br>
            
            
            <button class="btw" id="addp" onClick={()=>this.addProject()} disabled={this.state.disable}>add</button><br></br>
            
          </div>
  
            </div>:""}
              </Route>
              <Route path="/deleteproject">
                {this.state.del===true?
              <div  className="modal" id="addmodal" Style={this.state.del}>
      
       

      <div className="inp" >
      <div><span class="close"  onClick={this.toggledel}>&times;</span></div>
     
      <p className="centertext">Delete Project</p>
        <input type="text" placeholder="Name" id="dn" name="uname" onKeyUp={this.getdelprojectname} class="form-control "></input><br></br>
        <p id="valid" className="valid">{this.state.validd}</p>
      
        
        <button class="btw" id="delp" onClick={()=>this.delProject()} disabled={this.state.disable}>delete</button><br></br>
        
      </div>
      </div>:""}
              </Route>
              
              
            </Switch>
            </Router>
            <div className="btngrp">
            <button  className="scr-right"  id="ls" onClick={()=>this.leftScroll()}><i class="fa fa-angle-right"></i></button>
            <button  className="scr-right"  id="rs" onClick={()=>this.rightScroll()}><i class="fa fa-angle-left"></i></button>
            </div>
            </div>
          
          {this.state.projects!==null?<Boards boards={this.state.projects} action={this.action} display={"display:flex"} ></Boards>:<div Style="font-size:xx-large;text-align:center;">Loading</div>}</div>
          </div>:
          
          <Boards boards={this.state.projects} action={this.action} display={"display:none"}></Boards>}

          <script>
          </script>
        </main>
)
  }
}
export default App;