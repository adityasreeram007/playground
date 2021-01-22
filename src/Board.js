import './App.css';
import React, { Component} from 'react';
import Modules from "./components/Modules"
// import Modal from 'react-modal'

import axios from 'axios'
// import { Switch,BrowserRouter as Router,Route,Link } from 'react-router-dom';


// var sample=[
//     {
//         name:"webdesign",
//         submodules:[{
//             val:"desing1 is the most efficient cause of the data"
        
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"desing1"
        
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"desing1"
        
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"desing1"
        
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },

// ]
//     },
//     {
//         name:"webdesign",
//         submodules:[{
//             val:"desing1"
        
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },

// ]
//     },
//     {
//         name:"webdesign",
//         submodules:[{
//             val:"desing1"
        
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },

// ]
//     },
//     {
//         name:"webdesign",
//         submodules:[{
//             val:"desing1"
        
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },
//         {
//             val:"design2"
//         },

// ]
//     },
    
   
// ]
class Board extends Component {

    state={
        mod:false,
        del:false,
        modulename:"",
       
        valid:"Enter a unique Modal Name",
        validd:"Enter a Existing Project Name",
        disable:false,
        values:window.location.pathname.slice(7,).replace("%20"," "),
        currentmod:null,
        pinname:"",
        addpin:false,
        delpin:false,
        pinmodule:"",
        visible:false


        
    }
    componentWillMount(){
      window.onpopstate = (event) => {
        // if (window.location.pathname==='/addproject' || window.location.pathname==='/delproject' ) {
          this.setState({addpin:false,delpin:false})
        // }
      };
      
    }
    toggleAddPin=()=>{
      if (this.state.addpin===false){
        this.setState({addpin:true})}
        else{
          this.setState({addpin:false})
        }
    }
    toggleDelPin=()=>{
      if (this.state.delpin===false){
        this.setState({delpin:true})}
        else{
          this.setState({delpin:false})
        }
    }
   getpinname=event=>{
     this.setState({pinname:event.target.value})
     var value=window.location.pathname.slice(8,)
     value=value.replace("%20"," ")
     this.setState({pinmodule:value})
     console.log(event.target.value)
     

   }
   async addpin(){
     
    await axios.post("http://127.0.0.1:5000/addPin",{module:this.state.pinmodule,pin:this.state.pinname,project:this.state.values})
        
    this.getvalues()
    this.toggleAddPin()
   }
   async delpin(){
    await axios.post("http://127.0.0.1:5000/delPin",{module:this.state.pinmodule,pin:this.state.pinname,project:this.state.values})
        
    this.getvalues()
    this.toggleDelPin()
   }
    getname=event=>{
      this.setState({modulename:event.target.value})
      this.checkvalid(0,event.target.value)
    }
    // getpinname=event=>{
    //   this.setState({pinname:event.target.value})
      
    // }
    delname=event=>{
      this.setState({modulename:event.target.value})
      this.checkvalid(1,event.target.value)
    }
getvalues(){
  axios.post("http://127.0.0.1:5000/fetch",{}).then(value=>{

    var arr=[]
    var sample=[]
    
    for(var x in value.data.data.projects){
     
      arr.push(value.data.data.projects[x])
      sample.push(value.data.data.projects[x].modules)
    }
    var val=arr
   
    for (var i in val){
     console.log(val[i].name)
     if(val[i].name===this.state.values){
         
       console.log(val[i].modules)
        
         this.setState({currentmod:val[i].modules})
         break
     }
 }
    
    })
}

    async componentDidMount() {
      console.log("inside board")
      if(window.location.pathname.length>1){
        this.setState({visible:true})
      }
      
     if(window.performance){
       console.log(window.performance)
     }
      // if(performance.navigation.type === 1){
      //  window.location.href="http://127.0.0.1:3000/"
      
      // }
     
      window.addEventListener("keydown",function(event){
        if(event.keyCode === 116) {

          event.preventDefault();
    
          return false;
    
        }
      })
     console.log("values"+this.state.values)
     console.log("projects"+this.props.projects)
     
     this.getvalues()
    
    
      }
      
    toggleMod=()=>{
        if (this.state.mod===false){
          this.setState({mod:true})}
          else{
            this.setState({mod:false})
          }
      }
      toggledel=()=>{
        if (this.state.del===false){
          this.setState({del:true})}
          else{
            this.setState({del:false})
          }
      }
    async addMod(){
        await axios.post("http://127.0.0.1:5000/addModule",{name:this.state.modulename,pin:this.state.pinname,project:this.state.values})
        
        this.getvalues()
        this.toggleMod()
      
      }
      async delMod(){
        await axios.post("http://127.0.0.1:5000/delModule",{del:this.state.modulename,project:this.state.values})
        
       this.getvalues()
       this.toggledel()
      
      }
    async checkvalid(c,valx){
        var projects=this.state.currentmod
        if(c===0){
        var name=valx
        
        if(name.length <4){
          this.state.valid="Minimum Length is 4"
          this.state.disable = true
          return 
        }
        for (var x in projects){
          console.log(projects[x])
          if (projects[x].name===name){
            this.state.valid="Not Available.Enter a Valid Name."
            this.state.disable = true
            return 
          }
        }
        this.state.valid="Valid Entry."
        this.state.disable= false
      }
      else{
        var dname=valx
        document.getElementById('delm').disabled = true
        for (var o in projects){
          console.log(projects[o])
          if (projects[o].name===dname){
            this.state.validd="Press Delete"
            this.state.disable= false
            return 
          }
          else{
            this.state.validd="InValid Entry."
            this.state.disable= true
          }
        }
       
            
      }
      }
    async goback(){
      
      
        // console.log(this.props.history.push("/",{
        //   selected:null,
        //   add:false,
        //   del:false,
        //   projectname:"",
        //   description:"",
        //   date:"",
        //   deadline:"",
        //   valid:"Enter a unique Project Name",
        //   validd:"Enter a Existing Project Name",
        //   flag:0,
        //   todate:new Date().toDateString(),
        //   disable:false,
        //   addmodal:false,
        //   projects:null,
        //   modules:null,
        //   len:0,
        //   len1:0,
        //   visible:true
        
          
        // }))
        console.log("props")
        console.log(this.props)
        this.setState({visible:false})
        this.props.action()
       
    }
    async rightScroll(){
        var content=document.getElementById('modules');
        console.log(content)
        content.scrollLeft-=500;
        console.log("right")
     
    }
    async leftScroll(){
        var content=document.getElementById('modules');
        content.scrollLeft+=500;
        
    }
    async changeTheme(val){
        document.getElementById('rooter').style.backgroundColor=val
    }

    render() {
        return (
            <main >
             
            
              {this.state.mod===true?
              <div  className="modal" id="addmodal" Style={this.state.mod}>
      

        <div className="inp" >
        <span class="close" Style="float:right;font-family:ubuntu" onClick={this.toggleMod}>&times;</span>
        <p className="centertext">Add New Module</p>
          <input type="text" placeholder="Name" id="mn" name="uname" onKeyUp={this.getname} class="form-control "></input><br></br>
          <p id="valid" className="valid">{this.state.valid}</p>
          <input type="text" placeholder="Enter the first Pin" id="pn" name="pass" onKeyUp={this.getpinname} class="form-control  "></input><br></br>
         
          
          <button class="btw" id="addm" onClick={()=>this.addMod()} disabled={this.state.disable}>add</button><br></br>
          
        </div>
       </div>:""}
       {this.state.del===true?
       <div  className="modal" id="addmodal" Style={this.state.del}>
      

        <div className="inp" >
        <span class="close" Style="float:right" onClick={this.toggledel}>&times;</span>
        <p className="centertext">Delete Modal</p>
          <input type="text" placeholder="Name" id="dm" name="uname" onKeyUp={this.delname} class="form-control "></input><br></br>
          <p id="valid" className="valid">{this.state.validd}</p>
        
          
          <button class="btw" id="delm" onClick={()=>this.delMod()} disabled={this.state.disable}>delete</button><br></br>
         
        </div>
        </div>:""}

               
            {this.state.visible===true?
            <>
                <div className="container">
                <nav className="nav">
                {/* <div className="nav-item">
                  <Router>
                    <Link to="/">
                <button className="btnadd" Style="background-color:transparent;border:hidden" onClick={()=>this.goback()} ><i class="fa fa-backspace">/back</i></button></Link>
                <Switch>
                  <Route path="/" />
                  
                  
                </Switch>
                </Router>
            </div> */}
            <div className="nav-item" >
            <i class="fa fa-play"></i> PlAyGrOUnD
            </div>
          
            
            {/* <div className="btn">
               <div className="themes">
                   <button Style="background-color:#4BBF6B;border-radius:50%;font-size:xx-large;margin-right:2%" onClick={()=>this.changeTheme("#4BBF6B")}>G</button>
                   <button Style="background-color:white;border-radius:50%;font-size:xx-large;margin-right:2%" onClick={()=>this.changeTheme("white")}>W</button>
                   <button Style="background-color:	#FF4500;border-radius:50%;font-size:xx-large;margin-right:2%" onClick={()=>this.changeTheme("#FF4500")}>O</button>
                   <button Style="background-color:	#7B68EE;border-radius:50%;font-size:xx-large;margin-right:2%" onClick={()=>this.changeTheme("#7B68EE")}>M</button>
            
               </div>
           </div> */}

<br/><br/>
            </nav>
            <div className="boardname">
                {this.state.values} Board
            </div></div>
            
            <div className="rowboard">
            <div className="boardsearch" Style="padding:20px">
                <input className="search" placeholder="Search for a Pin"></input>
            </div><br/>
                MoDuleS
                <button  className="btn-right" onClick={this.toggleMod}><i class="fa fa-plus"></i></button>
            <button  className="btn-right" onClick={this.toggledel}><i class="fa fa-minus"></i></button>
           
           
                <hr/>
            </div>
           
                {this.state.currentmod!==null?<Modules modules={this.state.currentmod} delpinfunc={()=>this.delpin()} addpinfunc={()=>this.addpin()} add={this.state.addpin} getpinname={this.getpinname} del={this.state.delpin} addpin={this.toggleAddPin} delpin={this.toggleDelPin}></Modules>:<div Style="font-size:xx-large;text-align:center;">Loading</div>}
            
                    <div id="len1"></div><div id="len"></div>
                    

              </>: "" }
            </main>
        )
    }


}
export default Board