import React from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../user/actions';

class CookieSync extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    setUserFromCookie: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  }

  constructor(props) {
    super(props);

    const {
      cookies, name, email, token, setUserFromCookie,
    } = props;
    const { uToken, uName, uEmail } = cookies.get('user') || {};

    if (uToken && uName && uEmail) {
      if (!token && !name && !email) {
        setUserFromCookie(
          {
            name: uName || '',
            email: uEmail || '',
            token: uToken || '',
          },
        );
      }
    }

    if (token !== uToken && name !== uName && email !== uEmail) {
      cookies.set('user', {
        uName: name,
        uEmail: email,
        uToken: token,
      });
    }
  }

  render() {
    const { children } = this.props;

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
