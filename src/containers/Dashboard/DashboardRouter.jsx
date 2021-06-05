import { Route, Switch, Redirect } from 'react-router-dom';

import { LandingPage } from '..';
import { SensorDetails } from '../SensorDetails';

const DashboardRouter = () => (
  <Switch>
    <Redirect exact from="/" to="/dashboard" />
    <Route path="/dashboard" component={LandingPage} />
    <Route exact path="/sensor/:sensorId/details" component={SensorDetails} />
  </Switch>
);

export default DashboardRouter;
