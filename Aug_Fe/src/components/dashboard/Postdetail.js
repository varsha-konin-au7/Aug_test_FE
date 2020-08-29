import React ,{useEffect, Fragment }from 'react'
import {connect} from 'react-redux'
import {loadingpost} from './../../actions/profile'
import Spinner from './../loading/Spinner.gif'
import Commentcard from './Commentcard'


const Postdetail = (props) => {
    console.log(props.match.params)
    console.log(props.data)
    useEffect( () => {
        props.loadingpost(props.match.params)
    },[])

    return (
        <div>
        {
            props.loadedsingle ? <div><img
        src={Spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
        /></div>:<div>
                <p>{props.data.title}</p>
                <p>{props.data.description}</p>
                <div>
                    <p>{props.data.datetime}</p>
                </div>
                <Fragment>
                    {
                    (props.data.comment.length === 0) ? <span>No comment yet</span> 
                    :
                    <Fragment>
                        {
                            props.data.comment.map(single => {
                                return <Commentcard name={single.comment} user={single.user.username} />
                            })
                        }
                    </Fragment>
                    }
                </Fragment>
            </div> 
        }
            
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.profile.post.data,
    loadedsingle : state.profile.loadedsingle
})

export default connect(mapStateToProps, {loadingpost})(Postdetail)