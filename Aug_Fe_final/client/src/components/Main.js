import React from 'react'
import {Link, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import Login  from './auth/Login'
import Signup  from './auth/Signup'
import Profile from './../components/dashboard/Profile'


const Main = ({isAuthenticated}) => {
    console.log(isAuthenticated)
    return (
            <div>
            {
                isAuthenticated ?  <Profile />
                :<div><p>Auth component</p>
                <Link to='/login'  >Login</Link>  
                <Link to='/signup' >Signup</Link> 
            </div>
            }
            </div> 
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Main)