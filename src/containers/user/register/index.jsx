import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import actions from '../actions';
import st from './register.styl';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
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

  onNameChange = ({ target: { value } }) => {
    this.setState({
      name: value,
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
    const { register } = this.props;
    const { name, email, password } = this.state;

    register({ name, email, password });
  }

  render() {
    const { name, email, password } = this.state;
    const {
      registering, registerError, token,
    } = this.props;


    return (
      <div className={st.container}>
        { registerError ? (
          <p>
            {registerError}
          </p>
        ) : undefined }

        { token ? (
          <Redirect to="/" />
        ) : undefined }

        <form onSubmit={this.onSubmit}>
          <label htmlFor={name}>
            name
            <input
              value={name}
              onChange={this.onNameChange}
            />
          </label>

          <br />

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
              name.length < 3 || email.length < 3
                || password.length < 6 || registering
            }
          />
        </form>

        <Link to="/login">
          Click here to go to your login.
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  token: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  registering: PropTypes.bool.isRequired,
  registerError: PropTypes.string.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

const mapStateToProps = ({
  user: {
    token,
    registering,
    registerError,
  },
}) => ({
  token,
  registering,
  registerError,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  register: actions.onUserLogin,
  logout: actions.onUserLogout,
}, dispatch);

module.exports = connect(mapStateToProps, mapDispatchToProps)(withCookies(Login));
