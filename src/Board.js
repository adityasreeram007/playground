import './App.css';
import React, { Component} from 'react';
import Modules from "./components/Modules"
import Modal from 'react-modal'
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
        mod:false,
        del:false
    }
    async componentDidMount() {
       
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
        }}
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
    async checkvalid(c){
        var projects=JSON.parse(localStorage.getItem('currentmod'))
        if(c===0){
        var name=document.getElementById('mn').value;
        
        if(name.length <4){
          document.getElementById('valid').innerHTML="Minimum Length is 4"
          document.getElementById('addm').disabled = true
          return 
        }
        for (var x in projects){
          console.log(projects[x])
          if (projects[x].name===name){
            document.getElementById('valid').innerHTML="Not Available.Enter a Valid Name."
            document.getElementById('addm').disabled = true
            return 
          }
        }
        document.getElementById('valid').innerHTML="Valid Entry."
            document.getElementById('addm').disabled = false
      }
      else{
        var dname=document.getElementById('dm').value;
        document.getElementById('delm').disabled = true
        for (var o in projects){
          console.log(projects[o])
          if (projects[o].name===dname){
            document.getElementById('valid').innerHTML="Press Delete"
            document.getElementById('delm').disabled = false
            return 
          }
          else{
            document.getElementById('valid').innerHTML="InValid Entry."
            document.getElementById('delm').disabled = true
          }
        }
       
            
      }
      }
    async goback(){
        localStorage.removeItem('current')
        window.location.replace("http://127.0.0.1:3001/")

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
            <main >
                   <Modal 
        isOpen={this.state.mod}
        onRequestClose={this.toggleMod}
        contentLabel="My dialog" className="add"
      ><br></br>
      
<center>
        <div className="inp" >
        <p className="centertext">Add New Project</p>
          <input type="text" placeholder="Name" id="mn" name="uname" onKeyUp={()=>this.checkvalid(0)} class="form-control "></input><br></br>
          <p id="valid" className="valid">Enter a unique Modal Name</p>
          <input type="text" placeholder="Enter the first Pin" id="pn" name="pass"  class="form-control  "></input><br></br>
         
          
          <button class="btw" id="addm" onClick={()=>this.addMod()}>Add Module</button><br></br>
          <button class="btw" onClick={this.toggleMod}>Cancel</button>
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
          <input type="text" placeholder="Name" id="dm" name="uname" onKeyUp={()=>this.checkvalid(1)} class="form-control "></input><br></br>
          <p id="valid" className="valid">Enter a Existing Project Name</p>
        
          
          <button class="btw" id="delm" onClick={()=>this.delMod()}>Delete</button><br></br>
          <button class="btw" onClick={this.toggledel}>Cancel</button>
        </div></center>
        </Modal>

               

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