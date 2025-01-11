import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Fetch = () => {
  

  //Post Method :- TO INSERT DATA from From 

   let [input, setInput] = useState({
    name:'',
    course:'',
    fee:'',
    contact:''
  })

  
  let addData = (e)=>{
    let {name,value} = e.target;
    setInput({
      ...input,
      [name]:value
    })

  }

   let submitForm = (e)=>{
    e.preventDefault()
    let url= "http://localhost:3000/student"

    axios.post(url,input).then((res)=>{
    alert("inserted...")
    console.log(input);
    
    })

   }




//GET METHOD:- for show data
let [jsondata,setData]= useState([])

  let data = ()=>{
    let url ="http://localhost:3000/student"
    axios.get(url)
    .then((res)=>{
      //console.log(res.data)
      setData(res.data)
    }).catch((err)=>{
       console.log(err);
       
    });
  }
  let  result = jsondata.map((key)=>{
    return(
      <tr key={key.id} style={{backgroundColor:"yellowgreen"}}>
        <td>{key.id}</td>
        <td>{key.name}</td>
        <td>{key.course}</td>
        <td>{key.fee}</td>
        <td>{key.contact}</td>
        <td><button onClick={()=>{deletefun(key.id)}}>Delete</button></td>
      </tr>
    )
  })
 

 

//Delete Method :- 
  let deletefun = (id)=>{
    axios.delete(`http://localhost:3000/student/${id}`).then((res)=>{
      window.alert("deleted")
    })
  }

//jaisa bhi page reload ho to kya kya render hona chahiye ...iske liye useefffect 
//useeffect me ek function and [] me n number of dependancies hoti hai , if dependeny khali rakhni hai to, page redreing k sami useeffect chalega
  useEffect(()=>{data()},[deletefun])
  
 
 

 

  return (
  <>  
    <center>
      <h1>Axios Insert Day-3</h1>
     <table border={"1px"} bgcolor='grey' style={{textAlign:"center"}}>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Course</th>
        <th>Fee</th>
        <th>Contact</th>
      </tr>

     {result}
     </table>


     <h1> ****** Insert data ****** </h1>
  
  <form onSubmit={submitForm}>
    

      Name : <input type="text"  name='name' value={input.na}  onChange={addData}      /> <br />
      Course : <input type="text" name='course' value={input.cou}   onChange={addData}  /> <br />
      Fee    : <input type="text" name='fee'   value={input.fe}   onChange={addData}    /> <br />
      Contact : <input type="text" name='contact'  value={input.con}    onChange={addData}  /> <br />
 
      <input type="submit" />
      </form>
    </center>
  
  </>
  )
}

export default Fetch