import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import actions from '../actions';
import st from './login.styl';

class Login extends React.Component {
  constructor(props) {
    super(props);

    const {
      email,
    } = props;

    this.state = {
      email,
      password: '',
    };
  }

  componentDidMount() {
    const {
      logout,
      cookies,
    } = this.props;

    logout();
    cookies.set('user', {
      uToken: '',
      uName: '',
      uEmail: '',
    });
  }

  onEmailChange = ({ target: { value } }) => {
    this.setState({
      email: value,
    });
  }

  onPasswordChange = ({ target: { value } }) => {
    this.setState({
      password: value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { login } = this.props;
    const { email, password } = this.state;

    login({ email, password });
  }

  render() {
    const { email, password } = this.state;
    const {
      name, loggingIn, loginError, token,
    } = this.props;

    const greeting = name ? (
      <h1>
        Hello
        {name}
      </h1>
    ) : undefined;

    return (
      <div className={st.container}>
        { greeting }

        { loginError ? (
          <p>
            {loginError}
          </p>
        ) : undefined }

        { token ? (
          <Redirect to="/" />
        ) : undefined }

        <form onSubmit={this.onSubmit}>
          <label htmlFor={email}>
            email
            <input
              type="email"
              value={email}
              onChange={this.onEmailChange}
            />
          </label>

          <br />

          <label htmlFor={password}>
            password
            <input
              type="password"
              value={password}
              onChange={this.onPasswordChange}
            />
          </label>

          <br />

          <input
            type="submit"
            disabled={
              email.length < 3 || password.length < 6 || loggingIn
            }
          />
        </form>

        <Link to="/">
          Click here to go to your dashboard.
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  token: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  loginError: PropTypes.string.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

Login.defaultProps = {
  name: '',
  email: '',
};

const mapStateToProps = ({
  user: {
    name,
    email,
    token,
    loggingIn,
    loginError,
  },
}) => ({
  name,
  email,
  token,
  loggingIn,
  loginError,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login: actions.onUserLogin,
  logout: actions.onUserLogout,
}, dispatch);

module.exports = connect(mapStateToProps, mapDispatchToProps)(withCookies(Login));
