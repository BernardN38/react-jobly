import React, {useEffect} from 'react'

function Signout({user,setUser}) {
    useEffect(()=>{
        setUser({})
        localStorage.setItem("user", JSON.stringify({}))
    },[])
    return (
        <div>
            <h1>You have been logged out</h1>
        </div>
    )
}

export default Signout
