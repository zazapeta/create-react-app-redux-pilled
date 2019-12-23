import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Loader } from '../ui-kit';

import ErrorBound from './ErrorBound';

const ErrorPage = () => <h1>:( Something went wrong. </h1>; // TODO: A better error page maybe ?
const LoadingLazyPage = (
  <div>
    <Loader size="big" active={true} />
  </div>
);
const NoMatchPage = React.lazy(() =>
  import(
    /* webpackChunkName: "noMatch.page" */
    '../pages/noMatch.page'
  ),
);
const DumbPage = React.lazy(() =>
  import(
    /* webpackChunkName: "dumb.page" */
    '../pages/dumb.page'
  ),
);

// TODO
let PrivateRoute = ({ isLogged, component: Component, ...rest }) => {
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
  return <Route {...rest} render={routeRender} />;
};

// TODO : implment auth pills
PrivateRoute = connect((store) => ({
  isLogged: true, // <--- authSelector(store).isLogged
}))(PrivateRoute);

const Router = () => {
  return (
    <ErrorBound renderError={() => <ErrorPage />}>
      <React.Suspense fallback={LoadingLazyPage}>
        <Switch location={location}>
          <Route exact path="/" component={DumbPage} />
          <Route exact path="/login" component={DumbPage} />
          <PrivateRoute exact path="/dashboard" component={DumbPage} />
          <PrivateRoute component={NoMatchPage} />
        </Switch>
      </React.Suspense>
    </ErrorBound>
  );
};

export default Router;
