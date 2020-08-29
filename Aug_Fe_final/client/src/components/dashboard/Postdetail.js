import React ,{useEffect, Fragment, useState }from 'react'
import {connect} from 'react-redux'
import {loadingpost} from './../../actions/profile'
import Spinner from './../loading/Spinner.gif'
import Commentcard from './Commentcard'
import DeleteIcon from '@material-ui/icons/Delete';

import {posting2, deleting} from './../../actions/auth'


const Postdetail = (props) => {
    useEffect( () => {
        props.loadingpost(props.match.params)
    },[])

    const [formData, setFormData] = useState({
        comment: '',
        post: props.match.params.id,
        user: props.id
      });

    const { comment,post,user } = formData;
    
    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => { 
        e.preventDefault();
        console.log(comment,post,user)
        props.posting2({comment,post,user});
      };

    console.log(props.match.params)
    console.log(props.data)
    
      const delete2  = e => {
        console.log(props.id, props.data.author, props.data._id)
        
        console.log("clicked for delete")
        if (props.id ===  props.data.author) {
            props.deleting({userid:props.data.author, postid:props.data._id})
        } else {
            alert ("You cant have acces of deletion of this as you have not posted this")
        }
      }
    
    

    return (
        <div>
        {
            props.loadedsingle ? <div><img
        src={Spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
        /></div>:<div>
                <div> 
                        <div> 
                            <p>{props.data.title}</p>
                            <p>{props.data.description}</p>
                        </div>
                        <div> 
                            <DeleteIcon onClick={delete2}/>
                        </div>
                        <div>
                            <p>{props.data.datetime}</p>
                        </div>
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
                <div>
                    <h2>Comment Here</h2>
                    <form onSubmit={onSubmit}>
                        <input
                        type="text"
                        placeholder="Add Comment"
                        name="comment"
                        value={comment}
                        onChange={onChange}
                        required
                        />
                        <input type="submit" value="Addcomment" />
                    </form>
                </div>
            </div> 
        }
            
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.profile.post.data,
    loadedsingle : state.profile.loadedsingle,
    id: state.auth.user[0]._id,
    // userid:  state.profile.post.data.author,
    // postid:  state.profile.post.data._id
})

export default connect(mapStateToProps, {loadingpost, posting2, deleting})(Postdetail)