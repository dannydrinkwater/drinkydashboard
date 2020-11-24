import React from "react";
import "./login.styles.scss";

import firebase, { auth, signInWithGoogle } from "../firebase/firebase.utils";
import { BsFillPersonFill } from "react-icons/bs";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <div>
        {this.props.currentUser ? (
          <div
            onClick={() => auth.signOut()}
            className="login__btn"
            title={"Logout " + this.props.currentUser.displayName}
          >
            <img
              className="login__btn-photo"
              src={this.props.currentUser.photoURL}
              alt={this.props.currentUser.displayName}
            />
          </div>
        ) : (
          <div
            onClick={() => signInWithGoogle()}
            className="login__btn"
            title="Login"
          >
            <span className="login__btn-icon">
              <BsFillPersonFill />
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
