import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { register } from './../../actions/auth'
import PropTypes from 'prop-types';
import {Redirect } from 'react-router-dom'

const Signup = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, confirmPassword)
        if (password !== confirmPassword) {
            alert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password,confirmPassword });
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/profile" />;
     }
    

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange} />

                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />

                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange} />

                </div>
                <div className="form-group">
                    <input
                        type="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange} />
                </div>
                <input type="submit" value="Register" />
            </form>

        </div>
    )
}

Signup.propTypes = {
    register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { register })(Signup)