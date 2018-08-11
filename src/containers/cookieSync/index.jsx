import React from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../user/actions';

class CookieSync extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    setUserFromCookie: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  }

  render() {
    const { children } = this.props;

    const {
      cookies,
      name,
      email,
      token,
      setUserFromCookie,
    } = this.props;
    const { uToken, uName, uEmail } = cookies.get('user') || {};

    if (token && !uToken) {
      cookies.set('user', {
        uToken: token,
        uName: name,
        uEmail: email,
      });
    } else if (uToken && !token) {
      setUserFromCookie({
        name: uName,
        email: uEmail,
        token: uToken,
      });
    }

    return (
      <div>
        {children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setUserFromCookie: actions.setUserFromCookie,
}, dispatch);

const mapStateToProps = ({
  user: {
    name,
    email,
    token,
  },
}) => ({
  name,
  email,
  token,
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(withCookies(CookieSync));
