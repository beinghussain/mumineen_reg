import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Icon from "react-icons-kit";
import { basic_home, basic_pin1 } from "react-icons-kit/linea";
import icon from "../assets/mumineenshopicon.svg";

class Header extends Component {
  render() {
    return (
      <div>
        <div className="appbar_top">
          <div className="home-link">
            <Link to="">
              <span className="home-icon">
                <Icon size={16} icon={basic_home} />
              </span>
            </Link>
          </div>
          <ul className="menu_left">
            <li>
              <Link to="">Seller</Link>
            </li>
            <li>
              <Link to="">Travels</Link>
            </li>
            <li>
              <Link to="">Business Listing</Link>
            </li>
            <li>
              <Link to="">Promotions</Link>
            </li>
          </ul>
          <ul className="menu_right">
            <li>
              <Link to="">Offers</Link>
            </li>
            <li>
              <Link to="">Travels</Link>
            </li>
            <li>
              <Link to="">Business Listing</Link>
            </li>
            <li>
              <Link to="">Sign in</Link>
            </li>
            <li>
              <Link to="">
                <span className="with_icon">
                  <Icon icon={basic_pin1} /> Select your city
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="appbar_main">
          <div className="logo_right">
            <img src={icon} />
          </div>
          <div className="search_container">
            <input placeholder="search" />
          </div>
          <div className="main_menu_right" />
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
