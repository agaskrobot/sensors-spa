import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { PrivateRoute, NotFound } from '../../components';
import { Dashboard, Login } from '..';

const AppRouter = () => (
  <BrowserRouter basename={process.env.REACT_APP_ROOT_PATH}>
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/" component={Dashboard} />
      <Route path="/404" component={NotFound} />
      <Redirect exact from="*" to="/404" />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
