import React from "react";
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRouteAdmin = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!userInfo)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        if (!userInfo.isAdmin) return <Redirect to="/" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRouteAdmin;
