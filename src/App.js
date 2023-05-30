import { useEffect, useState } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

function App() {
const  [newUser, setNewAutor] = useState({
  name : "",
  birthDate : "",
  photo: ""
});

const [data, setData] = useState([]);

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("photo", newUser.photo);
  formData.append("name", newUser.name);
  formData.append("birthDate", newUser.birthDate);

  axios.post("http://localhost:8000/user/add", formData)
  .then((res)=>{
    alert("Data Added")
  })
  .catch((err)=>{
    console.log(err);
  })
}

const handleFileInput = (e) => {
setNewAutor((preValue)=>{
  return {
    ...preValue,
    photo : e.target.files[0]
  }
})
}

const handleTextInput = (e) => {
  const {value, name} = e.target;

  setNewAutor((preVale)=>{
    return {
      ...preVale,
      [name] : value
    }
  })


}


// get data 
useEffect(()=>{
  axios.get("http://localhost:8000")
  .then((res)=>{;
    setData(res.data)
  }).catch((err)=>{
    console.log(err);
  })
},[])
  return (
    <>
<form onSubmit={handleSubmit} encType="multipart/form-data">
   <input type="file" name="photo" accept=".png, .jpg, .jpeg" onChange={handleFileInput}/>
   <br  required/>
   <br />
   <input type="text" name="name" value={newUser.name} onChange={handleTextInput} placeholder="Name..." required/>
   <br />
   <br />
   <input type="text" name="birthDate" value={newUser.birthDate} onChange={handleTextInput} placeholder="Birth Date..." required/>
   <br />
   <br />
   <input type="submit" value="Submit" />
   </form>


{data.map((singleData)=>{
  console.log(singleData.photo)


return <div class="container">
  <div class="row">
    <div class="col">
     <img src={"http://localhost:8000/images/"+singleData.photo} alt="" width={"150px"} />
    </div>
  </div>
</div>
})}

  
    </>
  );
}

export default App;
