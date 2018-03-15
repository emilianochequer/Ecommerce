import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
// var Typeahead = require('react-bootstrap-typeahead');
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { user, products, logoutUser, goToProduct, history } = this.props;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link to="/products" className="navbar-brand">
          E-Commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/products" className="nav-link">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            {user.rol === 'admin' && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/admin/products/">
                    Products
                  </Link>
                  <a className="dropdown-item" href="#">
                    Categories
                  </a>
                  <Link className="dropdown-item" to="/admin/users">
                    Users
                  </Link>
                </div>
              </li>
            )}
          </ul>
          <Typeahead
            className="w-100 mx-3"
            ref="typeahead"
            onChange={selected => {
              if (selected.length) {
                history.push(`/products/${selected[0].id}`);
                setTimeout(() => this.refs.typeahead.getInstance().clear(), 0);
              }
            }}
            labelKey="name"
            options={products}
            paginate={true}
            minLength={2}
            maxResults={3}
            placeholder="Search..."
            renderMenuItemChildren={(option, props) => (
              <div>
                <div>
                  <img
                    alt={option.name}
                    style={{
                      height: '36px',
                      marginRight: '10px',
                      width: '36px',
                    }}
                    src={option.image}
                  />
                  <span>
                    {option.name}
                    {/* (rating: <span>{option.rating}</span>) */}
                  </span>
                </div>
              </div>
            )}
          />
          <Link to="/cart">
            <span className="oi oi-cart mx-3" title="cart" aria-hidden="true" />
          </Link>
          {user.id ? (
            <div className="mx-3">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <span className="navbar-text mr-3">
                    Welcome {user.firstName}!
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => logoutUser()}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="mx-3">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <button type="button" className="btn btn-secondary btn-sm">
                      Register
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <button type="button" className="btn btn-secondary btn-sm">
                      Login
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default Header;
