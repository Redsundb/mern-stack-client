import NavbarComponent from "./components/NavbarComponent";
import axios from "axios"
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import Swal from "sweetalert2"
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'
import { getUser, getToken } from "./services/authorize";

function App() {
  const [blogs,setBlogs] = useState([])
  const fetchData=()=>{
    axios
    .get(`${process.env.REACT_APP_API}/blogs`)
    .then(respone=>{
      setBlogs(respone.data)
    })
    .catch(err=>alert(err))
  }
  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete=(slug)=>{
    Swal.fire({
      title:"คุณต้องการลบบทความหรือไม่ ?",
      icon:"warning",
      showCancelButton:true
    })
    .then((result)=>{
      //กดปุ่มตกลง
      if(result.isConfirmed){
        deleteBlog(slug)
      }
    })
  }
  const deleteBlog=(slug)=>{
    axios
    .delete(`${process.env.REACT_APP_API}/blog/${slug}`,{
      headers: {
        token: getToken()
      }
    })
    .then(respone=>{
      Swal.fire("Deleted!", respone.data.message, "success")
      fetchData()
    })
    .catch(err=>{
      Swal.fire("Deleted!",err.response.data, "error")
      console.log(err.response.data)
    })
  }  

  return (
    <div className="container p-5">
      <NavbarComponent/>
      {blogs.map((blog,index)=>(
        <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
          <div className="col pt-3 pb-2">       
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <div className="p-3">{parse(blog.content.substring(0,250))}</div>
            <p className="text-muted">ผู้เขียน: {blog.author}, เผยแพร่: {new Date(blog.createdAt).toLocaleString()}</p>
            {getUser() &&(
              <div>
                <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>แก้ไขบทความ</Link> &nbsp;
                <button className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug)}>ลบบทความ</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
