import React,{useState} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {posting} from './../../actions/auth'

 const Addpost = ({isAuthenticated, posting, id}) => {

   

    const [formData, setFormData] = useState({
        title: '',
        description: "",
        author: id,
        datetime: ''
      });

    const { title,description,author,datetime } = formData;
    
    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => { 
        e.preventDefault();
        console.log(title,description,author,datetime)
        posting({title,description,author,datetime});
      };

    if (!isAuthenticated){
        return <Redirect to="/login" />
    }


    return (
        <div>
            <p> Post Your Card </p>
            <form onSubmit={onSubmit}>
                <input
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={onChange}
                required
            />
                <input
                type="description"
                placeholder="Email description"
                name="description"
                value={description}
                onChange={onChange}
                required
            />
            <input
                type="datetime"
                placeholder="Email datetime"
                name="datetime"
                value={datetime}
                onChange={onChange}
                required
            />
            
            <input type="submit" value="AddPost" />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    id: state.auth.user[0]._id
})


export default connect(mapStateToProps, {posting})(Addpost)
