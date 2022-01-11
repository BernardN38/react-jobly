import React from 'react'

function Home({user}) {
    return (
        <div className="container mt-3">
            <h1>Welcome {user.username}</h1>
        </div>
    )
}

export default Home
