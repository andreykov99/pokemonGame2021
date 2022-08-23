import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('idToken') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
};
export default PrivateRoute;
