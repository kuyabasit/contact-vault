import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser, logout } from '../../actions/authActions';
import { clearContacts } from '../../actions/contactActions';
import { Link } from 'react-router-dom';

const Navbar = ({
  title,
  icon,
  loadUser,
  logout,
  clearContacts,
  auth: { isAuthenticated, user },
}) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <a href='#!' onClick={onLogout}>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </>
  );
  const guestLinks = (
    <>
      <li>
        {' '}
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  logout: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  clearContacts: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: 'Contact Vault',
  icon: 'fas fa-id-card',
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, loadUser, clearContacts })(
  Navbar
);
