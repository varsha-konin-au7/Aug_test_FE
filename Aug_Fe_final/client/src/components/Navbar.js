import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

 const Navbar = ({isAuthenticated}) => {
    return (
        <div>
                <Link to='/profile'>Profile</Link>
                {
                    isAuthenticated && <div>
                        <Link to='/add'>Add Post</Link>
                        <Link to='/delete'>Delete Post</Link>
                    </div>
                }
        </div>
    )
}

const mapSTateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapSTateToProps)(Navbar)