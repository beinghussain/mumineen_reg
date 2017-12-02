import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Drawer, MenuItem, Divider, Avatar, RaisedButton } from "material-ui";
import Icon from "react-icons-kit";
import { basic_home } from "react-icons-kit/linea";
import { IoIosLocation, IoNavicon, IoIosBolt, IoSocialInstagramOutline, IoEdit } from "react-icons/lib/io";
import icon from "../assets/mumineenshop_full.svg";
import icon1 from "../assets/mumineenshopicon.svg";

import headerImg from "../assets/being_programmer.jpg";

class Header extends Component {
  state = {
    open: false
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <div>
        <div className="appbar_desktop">
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
                <Link to="">Register</Link>
              </li>
              <li>
                <Link to="">Link instagram</Link>
              </li>

              <li>
                <Link to="/login">Sign in</Link>
              </li>
            </ul>
          </div>
          <div className="appbar_main">
            <div className="right_container">
              <div className="logo_right">
                <img alt="" src={icon1} />
              </div>
              <div className="search_container">
                <input spellCheck={false} placeholder="Search a Product..." />
              </div>
            </div>
            <div className="main_menu_right">
              <ul>
                <li className="select_city">
                  <RaisedButton icon={<IoIosLocation />} style={{ margin: 15, fontFamily: "Montserrat !important", fontWeight: 600 }} primary={true} label="Select city" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="appbar_mobile">
          <Drawer className="drawer" docked={false} width={320} open={this.state.open} onRequestChange={open => this.setState({ open })}>
            <div className="drawer_header">
              <div />
              <div>
                <span className="drawer_logo_container">
                  <img className="drawer_logo" src={icon1} />
                </span>
                <span className="user_name_container">
                  <span className="username">{"User"}</span>
                  <br />
                  <span className="usermail">{"email@mumineenshop.com"}</span>
                </span>
              </div>
            </div>
            <div className="drawer_container">
              <MenuItem primaryText="Dashboard" leftIcon={<IoIosBolt />} />
              <Divider />
              <MenuItem primaryText="Link Instagram" leftIcon={<IoSocialInstagramOutline />} />
              <Divider />
              <MenuItem primaryText="Register for seller" leftIcon={<IoEdit size={1} />} />
            </div>
            <div className="footer_drawer">
              <p>{"Copy right © 2017"}</p>
            </div>
          </Drawer>
          <div className="appbar_top">
            <ul className="menu_left">
              <li>
                <a onClick={this.handleToggle}>
                  <IoNavicon size={28} />
                </a>
              </li>
            </ul>
            <ul className="menu_right">
              <li>
                <Link className="menu_button" to="">
                  Login
                </Link>
                <Link to="">
                  <IoIosLocation size={24} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
