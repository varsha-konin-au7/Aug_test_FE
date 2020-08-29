import axios from 'axios'
import _ from 'lodash'
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();

export const loadUser = () => async dispatch => {
    try {
      const res2 = await axios.get('/api/v1/users') 
      const res = await axios.get('/api/v1/post');
      console.log(res) 
      dispatch({
        type: "USER_LOADED",
        payload: res2.data
      });
      dispatch({
          type:"POST_LOADED",
          payload: res.data
      })
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR"
      });
    }
  };

export const login = (email, password) => async dispatch => {

    console.log(email, password)

    const body = { email, password };
    
    console.log(body)
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = {email, password }

        const res = await axios.post("/api/v1/users/login",
            body,
            config
        )

        localStorage.setItem('x-auth-token', res.data.token);
        // const res = await api.get('/auth');
        console.log(res)

        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
          });
      
          dispatch(loadUser());

    }catch(err){
        console.log("error==>>>", err)
    }

    // try {
    //   const res = await api.post('/auth', body);
  
    //   dispatch({
    //     type: LOGIN_SUCCESS,
    //     payload: res.data
    //   });
  
    //   dispatch(loadUser());
    // } catch (err) {
    //   const errors = err.response.data.errors;
  
    //   if (errors) {
    //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    //   }
  
    //   dispatch({
    //     type: LOGIN_FAIL
    //   });
//     }
//   }
}

export const register = ({ name, email, password ,confirmPassword}) => async dispatch => {
    try {
 
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ username:name, email, password, confirmPassword })

        const res = await axios.post("/api/V1/users/signup",
            body,
            config

        )
        console.log(res)
        dispatch({
            type: "REGISTER_SUCCESS",
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors)
        dispatch({
            type: "REGISTER_FAIL"
        })
    }
}; 


export const posting = ({title,description,author,datetime}) =>async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ title,description,author,datetime })
        console.log(body)

        const res = await axios.post("/api/v1/post",
            body,
            config

        )
        console.log(res)
        dispatch(loadUser());

    }catch(err){
        console.log(err)
    }
}



export const  posting2 = ({comment,post,user}) => async dispatch => {
    try{
        console.log("From Paload of comment action in auth", comment,post,user)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ comment,post,user })
        console.log(body)

        const res = await axios.post("/api/v1/comment",
            body,
            config
        )
        console.log(res)
        dispatch(loadUser());
    }catch(err){
        console.log(err)
    }
}

export const deleting = ({postid, userid}) => async dispatch => {
    try{
        console.log("From Paload of comment action in auth",  postid, userid)
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }
        // const body = { userid,  postid }
        // console.log(body)

        const res = await axios.delete(`/api/v1/post/${userid}/${postid}` )
        console.log(res)
        dispatch(loadUser())
    }catch(err){
        console.log(err)
    }
}