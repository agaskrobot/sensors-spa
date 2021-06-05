import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector((s) => s.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        // When the user is authenticated render the component
        if (user.authenticated) {
          return <Component {...props} />;
        }

        // Redirect the user to the login view and remember the original URL to redirect back after login
        const { pathname, search } = window.location;
        return <Redirect to={{ pathname: '/login', state: { backTo: `${pathname}${search}` } }} />;
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired
};
