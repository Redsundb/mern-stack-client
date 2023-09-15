import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavbarComponent from "./NavbarComponent";
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import { getToken } from "../services/authorize"

const EditComponent=()=>{
    const [state, setState] = useState({
        title:"",
        author:"",
        slug:""
    })
    const { slug } = useParams();
    const {title,author} = state
    const [content,setContent] = useState('')
    
    const submitContent=(event)=>{
        setContent(event)
    }

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API}/blog/${slug}`)
        .then(response=>{
            const {title,content,author,slug} = response.data
            setState(state=>({title,author,slug}))
            setContent(content)
        })
        .catch(err=>(alert(err)))
    }, [slug]);


    const showUpdateForm=()=>(
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label>ชื่อบทความ</label>
                <input type="text" className="form-control" 
                    value={title} 
                    onChange={inputValue("title")}
                />
            </div>
            <div className="form-group">
                <label>รายละเอียด</label>
                <ReactQuill
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        placeholder="เขียนรายละเอียดบทความของคุณ"
                        style={{border:'1px solid #666'}}
                />
            </div>
            <div className="form-group">
                <label>ผู้แต่ง</label>
                <input type="text" className="form-control" 
                    value={author} 
                    onChange={inputValue("author")}
                />
            </div>
            <br/>
            <input type="submit" value="อัพเดต" className="btn btn-primary"/>
        </form>
    )

    //กำหนด state
    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value});
    }


    const submitForm=(e)=>{
        e.preventDefault();
        axios
        .put(`${process.env.REACT_APP_API}/blog/${slug}`,
        {title,content,author},
        {headers: {
            token: getToken()
          }
        })
        
        .then(response=>{
            Swal.fire('แจ้งตอน','อัพเดตความเรียบร้อย','success')
            const { title,content,author,slug} = response.data
            setState({...state, title,author,slug}) 
            setContent(content)
        })
        .catch(err=>{
            Swal.fire('แจ้งตอน',err.response.data.error,'error')  
        })
    }

    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>แก้ไขบทความ</h1>
            {showUpdateForm()}
        </div>
    );
}

export default EditComponent;