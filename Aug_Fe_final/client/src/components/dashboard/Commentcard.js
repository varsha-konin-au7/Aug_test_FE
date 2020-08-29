import React from 'react'

const Commentcard = ({name, user}) => {

    return (
        <div>
            <p>{name}</p>
            <p>{user}</p>
        </div>
    )
}

export default Commentcard