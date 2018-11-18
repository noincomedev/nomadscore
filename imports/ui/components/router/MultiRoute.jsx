import React from "react";
import { PropTypes } from "prop-types";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const MultiRoute = ({ component, content, exact, name, path, title }) => {
  if (!Meteor.userId())
    return (
      <PublicRoute
        content={content}
        component={component}
        exact={exact}
        name={name}
        path={path}
        title={title}
      />
    );
  return (
    <PrivateRoute
      exact={exact}
      component={component}
      content={content}
      name={name}
      path={path}
      title={title}
    />
  );
};

MultiRoute.propTypes = {
  component: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  name: PropTypes.string.isRequired,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  user: PropTypes.object
};

export default MultiRoute;
