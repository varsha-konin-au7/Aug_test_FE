import React from 'react'
import {connect} from 'react-redux'
import  Profilecard from './Profilecard'
import Spinner from './../loading/Spinner.gif'

const Profile = ({productfetch,profile}) => {
    return (
        <div>
        {
            productfetch ? <div><img
        src={Spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
        /></div>
            : <div> 
                {
                    profile.map(single=>{
                    return  <Profilecard id={single._id}  title={single.title} description={single.description} datetime={single.datetime}  />
                })
                }
            </div>

        }  
        </div>
    )
}

const mapStateToProps = (state) => ({
    productfetch: state.auth.productfetch,
    profile : state.auth.copyPost
})

export default connect(mapStateToProps)(Profile)