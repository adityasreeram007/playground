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
    add:"display:none",
    del:"display:none",
    projectname:"",
    description:"",
    date:"",
    deadline:"",
    valid:"Enter a unique Project Name",
    validd:"Enter a Existing Project Name",
    flag:0,
    todate:new Date().toDateString(),
    disable:false,
    addmodal:false
    
  }

  getprojectname=event=>{
    this.setState({projectname:event.target.value});
    this.checkvalid(0,event.target.value)
  }
  getdelprojectname=event=>{
    console.log(1111)
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
    if (this.state.add==="display:none"){
      this.setState({add:"display:block"})}
      else{
        this.setState({add:"display:none"})
      }
  }
  toggledel=()=>{
    if (this.state.del==="display:none"){
      this.setState({del:"display:block"})}
      else{
        this.setState({del:"display:none"})
      }
  }
  async addProject(){
    await axios.post("http://127.0.0.1:5000/addProject",{name:this.state.projectname,date:this.state.date,days:this.state.deadline,desc:this.state.description})
    
    localStorage.removeItem('projects')
    console.log(localStorage.getItem('projects'))
    window.location.reload(false)
  
  }
  async delProject(){
    await axios.post("http://127.0.0.1:5000/delProject",{del:this.state.projectname})
    
    localStorage.removeItem('projects')
    console.log(localStorage.getItem('projects'))
    window.location.reload(false)
  
  }
    
  
  async checkvalid(c,projectname){
    var projects=JSON.parse(localStorage.getItem('projects'))
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
  componentDidUpdate(){
    
  }
  async componentDidMount() {
    if(localStorage.getItem('current')){
      this.state.flag=1
    }
  
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
      console.log(JSON.parse(localStorage.getItem('projects')).length)
      console.log(this.state.len)
    this.state.len=JSON.parse(localStorage.getItem('projects')).length
    console.log(this.state.len)
    this.state.len1=JSON.parse(localStorage.getItem('projects')).length
   
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
        <main id="app">
          <Router>
          <Switch>
            <Route path="/:id">
            
              <Board data={this.state.selected}></Board>
            </Route>
          </Switch>
          </Router>
          <div  className="modal" id="addmodal" Style={this.state.add}>
          
          <center>
          

        <div className="inp" >
        <span class="close" Style="float:right" onClick={this.toggleadd}>&times;</span>
        <p className="centertext">Add New Project</p>
          <input type="text" placeholder="Name" id="pn" name="uname"  onKeyUp={this.getprojectname} class="form-control "></input><br></br>
          <p id="valid" className="valid">{this.state.valid}</p>
          <input type="text" placeholder="date ex: 2 jan 2020" id="pd" onKeyUp={this.getdate} name="pass"  class="form-control  "></input><br></br>
          <input type="text" placeholder="DeadLine days" id="days" onKeyUp={this.getdeadline} name="pass"  class="form-control  "></input><br></br>
          <input type="text" placeholder="description" id="desc" onKeyUp={this.getdesc} name="pass"  class="form-control  "></input><br></br>
          
          <button class="btw" id="addp" onClick={()=>this.addProject()} disabled={this.state.disable}>add</button><br></br>
          
        </div></center>

          </div>

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
       <div  className="modal" id="addmodal" Style={this.state.del}>
      
<center>
        <div className="inp" >
        <span class="close" Style="float:right" onClick={this.toggledel}>&times;</span>
        <p className="centertext">Delete Project</p>
          <input type="text" placeholder="Name" id="dn" name="uname" onKeyUp={this.getdelprojectname} class="form-control "></input><br></br>
          <p id="valid" className="valid">{this.state.validd}</p>
        
          
          <button class="btw" id="delp" onClick={()=>this.delProject()} disabled={this.state.disable}>delete</button><br></br>
          
        </div></center>
        </div>




          {!localStorage.getItem('flag')?
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
            <span Style="float:right" id="date">{this.state.todate}</span>
            
            
            </div>
            <hr/>
            <div className="row" Style="padding:0%" >
            <span Style="float:left;margin-left:5%;" >Projects</span><br/>
            
            
            
            </div>
            
            <div className="row" Style="display:flex;" >
                <div className="details" ><span className="text" id="len1" Style="font-weight:bold;">{localStorage.getItem('projects')?JSON.parse(localStorage.getItem('projects')).length:0}</span><br/><span className="text">Total</span></div>
                <div className="details" ><span className="text" id="len">{localStorage.getItem('projects')?JSON.parse(localStorage.getItem('projects')).length:0}</span><br/><span className="text">Progress</span></div>
                <div className="details" ><span className="text">0</span><br/><span className="text">Completed</span></div>
                
            </div>
            
            <div className="row" >
            <span Style="float:left" >Boards</span>
            <button  className="btn-right" onClick={this.toggleadd}><i class="fa fa-plus"></i></button>
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