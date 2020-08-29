import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner.gif'

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, productfetch },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
        productfetch ? (
        <img
        src={Spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
        />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);