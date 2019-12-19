import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Loader } from '../ui-kit';
import { currentMobilitySelector } from '../pills/mobilities/mobilities.selectors';

import ErrorBound from './ErrorBound';

const ErrorPage = () => <h1>:( Something went wrong. </h1>; // TODO: A better error page maybe ?
const LoadingLazyPage = (
  <div>
    <Loader size="big" active={true} />
  </div>
);

const LoginPage = React.lazy(() =>
  import(/* webpackChunkName: "login.page" */
  '../pages/login.page'),
);
const SubscriptionPage = React.lazy(() =>
  import(/* webpackChunkName: "subscription.page" */
  '../pages/subscription.page'),
);
const HomePage = React.lazy(() =>
  import(/* webpackChunkName: "home.page" */
  '../pages/dashboard/home.page'),
);
const MobilitiesPage = React.lazy(() =>
  import(/* webpackChunkName: "mobilities.page" */
  '../pages/mobilities.page'),
);
const MobilityActivationPage = React.lazy(() =>
  import(/* webpackChunkName: "mobilityActivation.page" */
  '../pages/mobiltyActivation.page'),
);
const TaskPage = React.lazy(() =>
  import(/* webpackChunkName: "task.page" */
  '../pages/task/task.page'),
);
const ThemePage = React.lazy(() =>
  import(/* webpackChunkName: "theme.page" */
  '../pages/theme/theme.page'),
);
const ServicePage = React.lazy(() =>
  import(/* webpackChunkName: "service.page" */
  '../pages/service/service.page'),
);
const MobilityEditionPage = React.lazy(() =>
  import(/* webpackChunkName: "mobilityEdition.page" */
  '../pages/mobilityEdition/mobilityEdition.page'),
);
const UserProfilePage = React.lazy(() =>
  import(/* webpackChunkName: "userProfile.page" */
  '../pages/userProfile/userProfile.page'),
);
const NoMatchPage = React.lazy(() =>
  import(/* webpackChunkName: "noMatch.page" */
  '../pages/noMatch.page'),
);
const DataLoaderContainer = React.lazy(() =>
  import(/* webpackChunkName: "dataloader.container" */
  '../pills/dataLoader/dataLoader.container'),
);
const DumbPage = React.lazy(() =>
  import(/* webpackChunkName: "dumb.page" */
  '../pages/dumb.page'),
);

let PrivateRoute = ({
  isLogged,
  component: Component,
  activatedMobilityRequired,
  currentMobility,
  ...rest
}) => {
  let routeRender = (props) => <Component {...props} />;
  if (!isLogged) {
    routeRender = (props) => (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    );
  }
  if (activatedMobilityRequired) {
    if (currentMobility && !currentMobility.isInitialized) {
      routeRender = (props) => (
        <Redirect
          to={{
            pathname: '/mobilities/activation',
            state: { from: props.location },
          }}
        />
      );
    }
  }
  return <Route {...rest} render={routeRender} />;
};

// TODO : use useslector
PrivateRoute = connect((store) => ({
  isLogged: store.Auth.user && store.Auth.user.isLogged,
  currentMobility: currentMobilitySelector(store),
}))(PrivateRoute);

PrivateRoute.propTypes = {
  activatedMobilityRequired: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  activatedMobilityRequired: false,
};

const Router = ({ indexRedirect, location }) => {
  return (
    <ErrorBound renderError={() => <ErrorPage />}>
      <React.Suspense fallback={LoadingLazyPage}>
        <Switch location={location}>
          <Redirect exact from="/" to={indexRedirect} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/subscription" component={SubscriptionPage} />
          {/* 
            HACK: This route is used by nav.desktop.subNav.view.jsx to handle the switch mobility.
            Indeed, we have to refresh all the data fetched i.e re-render the <DataLoaderContainer />.
            So, in this goal, we have to aim a route outside the <DataLoadercontainer /> and be Redirected to a route inside it.
             - Fix possible n°1 : refacto this and use something like /mobilities/:mobilityId and refetch the data when mobilityId change !
             - Fix possible n°2 : create an action 'refreshData' and dispatch it when switching mobility
             - Fix possible n°3 (favorite): when the action setCurrentMobility is dispatched, 
                      update the store by dispatching the 'load' action created by the <DataLoadContaier /> pill 
           */}
          <Route
            exact
            path="/mobilityportal_redirection_to_dashboard_of_new_mobility_resending_requests"
            component={() => <Redirect to="/dashboard" />}
          />
          <PrivateRoute exact path="/mobilities" component={MobilitiesPage} />
          <PrivateRoute
            exact
            path="/mobilities/activation"
            component={MobilityActivationPage}
          />
          <DataLoaderContainer>
            <Switch location={location}>
              <PrivateRoute
                exact
                path="/dashboard"
                component={HomePage}
                activatedMobilityRequired={true}
              />
              <PrivateRoute
                exact
                path="/themes/:id"
                component={ThemePage}
                activatedMobilityRequired={true}
              />
              <PrivateRoute
                exact
                path="/services/:id"
                component={ServicePage}
                activatedMobilityRequired={true}
              />
              <PrivateRoute
                exact
                path="/tasks/:id"
                component={TaskPage}
                activatedMobilityRequired={true}
              />
              <PrivateRoute
                exact
                path="/mobilities/edition"
                component={MobilityEditionPage}
              />
              <PrivateRoute exact path="/bills" component={DumbPage} />
              <PrivateRoute exact path="/notifications" component={DumbPage} />
              <PrivateRoute exact path="/messages" component={DumbPage} />
              <PrivateRoute exact path="/documents" component={DumbPage} />
              <PrivateRoute
                exact
                path="/profile/edit"
                component={UserProfilePage}
              />
              <PrivateRoute component={NoMatchPage} />
            </Switch>
          </DataLoaderContainer>
        </Switch>
      </React.Suspense>
    </ErrorBound>
  );
};

Router.propTypes = {
  indexRedirect: PropTypes.string,
};

Router.defaultProps = {
  indexRedirect: '/login',
};

export default connect(({ router }) => ({ location: router.location }))(Router);
