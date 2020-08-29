import React from 'react'
import {Link } from 'react-router-dom'

const Profilecard = ({id,title,description, datetime}) => {
    return (
        <div>
            <Link to={`/profile/${id}`} >
                <span>{title}</span>
                <span>{description}</span>
                <span>{datetime}</span>
            </Link>
        </div>
    )
}

export default Profilecard


