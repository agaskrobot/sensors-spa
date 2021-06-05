import { Route, Switch, Redirect } from 'react-router-dom';

import { LandingPage } from '..';

const DashboardRouter = () => (
  <Switch>
    <Redirect exact from="/" to="/dashboard" />
    <Route path="/dashboard" component={LandingPage} />
  </Switch>
);

export default DashboardRouter;
