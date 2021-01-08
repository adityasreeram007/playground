import './App.css';
import React, { Component} from 'react';
import Modules from "./components/Modules"
// import Modal from 'react-modal'
import axios from 'axios'
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
        mod:"display:none",
        del:"display:none",
        modulename:"",
        pinname:"",
        valid:"Enter a unique Modal Name",
        validd:"Enter a Existing Project Name",
        disable:false,
        
    }
    getname=event=>{
      this.setState({modulename:event.target.value})
      this.checkvalid(0,event.target.value)
    }
    getpinname=event=>{
      this.setState({pinname:event.target.value})
      
    }
    delname=event=>{
      this.setState({modulename:event.target.value})
      this.checkvalid(1,event.target.value)
    }

    async componentDidMount() {
     if(localStorage.getItem('current')){
      localStorage.removeItem('current')
      localStorage.setItem('flag',1)
       window.location.reload(false)
       
      
     }
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
        
        var val=JSON.parse(localStorage.getItem('projects'))
       
        for (var i in val){
            console.log(val[i].name)
            if(val[i].name===localStorage.getItem('current')){
                
                
                localStorage.setItem('currentmod',JSON.stringify(val[i].modules))
                break
            }
        }
        console.log(localStorage.getItem(JSON.parse(localStorage.getItem('currentmod'))))
      window.location.reload(false)
        } 
      }
      
    toggleMod=()=>{
        if (this.state.mod==="display:none"){
          this.setState({mod:"display:block"})}
          else{
            this.setState({mod:"display:none"})
          }
      }
      toggledel=()=>{
        if (this.state.del==="display:none"){
          this.setState({del:"display:block"})}
          else{
            this.setState({del:"display:none"})
          }
      }
    async addMod(){
        await axios.post("http://127.0.0.1:5000/addModule",{name:document.getElementById('mn').value,pin:document.getElementById('pn').value,project:localStorage.getItem('current')})
        
        localStorage.removeItem('projects')
        console.log(localStorage.getItem('projects'))
        window.location.reload(false)
      
      }
      async delMod(){
        await axios.post("http://127.0.0.1:5000/delModule",{del:document.getElementById('dm').value,project:localStorage.getItem('current')})
        
        localStorage.removeItem('projects')
        console.log(localStorage.getItem('projects'))
        window.location.reload(false)
      
      }
    async checkvalid(c,valx){
        var projects=JSON.parse(localStorage.getItem('currentmod'))
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
        localStorage.removeItem('currentmod')
        localStorage.removeItem('projects')
        localStorage.removeItem('modules')
        localStorage.removeItem('flag')

        window.location.replace("http://127.0.0.1:3000/")

    }
    async rightScroll(){
        var content=document.getElementById('modules');
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
            <main ><div  className="modal" id="addmodal" Style={this.state.mod}>
      
<center>
        <div className="inp" >
        <span class="close" Style="float:right" onClick={this.toggleMod}>&times;</span>
        <p className="centertext">Add New Module</p>
          <input type="text" placeholder="Name" id="mn" name="uname" onKeyUp={this.getname} class="form-control "></input><br></br>
          <p id="valid" className="valid">{this.state.valid}</p>
          <input type="text" placeholder="Enter the first Pin" id="pn" name="pass" onKeyUp={this.getpinname} class="form-control  "></input><br></br>
         
          
          <button class="btw" id="addm" onClick={()=>this.addMod()} disabled={this.state.disable}>add</button><br></br>
          
        </div></center>
       </div>
       <div  className="modal" id="addmodal" Style={this.state.del}>
      
<center>
        <div className="inp" >
        <span class="close" Style="float:right" onClick={this.toggledel}>&times;</span>
        <p className="centertext">Delete Modal</p>
          <input type="text" placeholder="Name" id="dm" name="uname" onKeyUp={this.delname} class="form-control "></input><br></br>
          <p id="valid" className="valid">{this.state.validd}</p>
        
          
          <button class="btw" id="delm" onClick={()=>this.delMod()} disabled={this.state.disable}>delete</button><br></br>
         
        </div></center>
        </div>

               

                <nav>
                <div className="nav-item">
                <button className="btnadd" Style="background-color:transparent;border:hidden" onClick={()=>this.goback()}><i class="fa fa-backspace">/back</i></button>
            </div>
            <div className="nav-item" Style="margin-left:5%">
            <i class="fa fa-play"></i> PlAyGrOUnD
            </div>
          
            <div className="nav-item-right"><div id="date"></div></div>
            <div className="nav">
               <div className="themes">
                   <button Style="background-color:#4BBF6B;border-radius:50%;font-size:xx-large;margin-right:2%" onClick={()=>this.changeTheme("#4BBF6B")}>G</button>
                   <button Style="background-color:white;border-radius:50%;font-size:xx-large;margin-right:2%" onClick={()=>this.changeTheme("white")}>W</button>
                   <button Style="background-color:	#FF4500;border-radius:50%;font-size:xx-large;margin-right:2%" onClick={()=>this.changeTheme("#FF4500")}>O</button>
                   <button Style="background-color:	#7B68EE;border-radius:50%;font-size:xx-large;margin-right:2%" onClick={()=>this.changeTheme("#7B68EE")}>M</button>
            
               </div>
           </div>


            </nav><center>
            <div className="boardname">
                {localStorage.getItem('current')} Board
            </div></center>
            <div className="boardsearch" Style="padding:2%">
                <input className="search" placeholder="Search for a Pin"></input>
            </div>
            <div className="rowboard">
                MoDuleS
                <button  className="btn-right" onClick={this.toggleMod}><i class="fa fa-plus"></i></button>
            <button  className="btn-right" onClick={this.toggledel}><i class="fa fa-minus"></i></button>
           
            <button  className="btn-right" Style="float:right" id="ls" onClick={()=>this.leftScroll()}><i class="fa fa-angle-right"></i></button>
            <button  className="btn-right" Style="float:right" id="rs" onClick={()=>this.rightScroll()}><i class="fa fa-angle-left"></i></button>
                <hr/>
            </div>
            <div className="modules">
                <Modules modules={JSON.parse(localStorage.getItem('currentmod'))}></Modules>

            </div>
                    <div id="len1"></div><div id="len"></div>
            </main>
        )
    }


}
export default Board