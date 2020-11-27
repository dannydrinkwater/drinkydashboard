import React from "react";
import "./header.styles.scss";

import Login from "../login/login.component";
import Weather from "../weather/weather.component";

export default function Header(props) {
  const { currentUser } = props;

  return (
    <div className="header">
      <Login currentUser={props.currentUser} />
      {currentUser && <Weather />}
    </div>
  );
}
