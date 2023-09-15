// เก็บข้อมูลหรือเก็บ token และ username => sesson storage
export const authenticate=(response, next)=>{
    if (window !== "undefined") {
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("username", JSON.stringify(response.data.username));
    }
    next();
}


// ดึงข้อมูล token มาจาก sesson storage
export const getToken=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false;
        }
    }
}


// ดึงข้อมูล username มาจาก sesson storage
export const getUser=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("username")){
            return JSON.parse(sessionStorage.getItem("username"))
        }else{
            return false;
        }
    }
}

// Logout
export const logout=(next)=>{
    if(window !== "undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
    }
    next()
}