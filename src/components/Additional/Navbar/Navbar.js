import { useApolloClient, useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { USER_DELETE_TOKENS_MUTATION } from "../../Api/user";
import "./Navbar.css";

const SPECIAL_VIDEO_URL =
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO";

const Navbar = ({ user }) => {
  const usersProfile = `/profile/${user}`;

  const history = useHistory();
  const [activeItem, setActiveItem] = useState();

  const client = useApolloClient();
  const [deleteTokens] = useMutation(USER_DELETE_TOKENS_MUTATION);

  const handleItemClick = (name) => {
    setActiveItem(name);
  };

  const handleOnLogout = async () => {
    // Delete JWT tokens
    await deleteTokens();
    Cookies.remove("tokenExpiration");

    // Reset store
    client.resetStore();

    history.push("/login");
    window.location.reload(false); // Reset site
  };

  return (
    <>
      <nav className="navbar navbar-container navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            Article
          </Link>
          <>
            {user ? (
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-0 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/posts" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/users" className="nav-link">
                      Users
                    </Link>
                  </li>
                </ul>
                <div className="navbar-nav ml-auto">
                  <li>
                    <Link to="/createPost" className="nav-link">
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link to={usersProfile} className="nav-link">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/support" className="nav-link">
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-toggle="collapse"
                      to="#"
                      className="nav-link"
                      onClick={() => window.open(SPECIAL_VIDEO_URL, "_blank")}
                    >
                      Special
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-toggle="collapse"
                      className="nav-link"
                      onClick={() => handleOnLogout()}
                    >
                      Logout
                    </Link>
                  </li>
                </div>
              </div>
            ) : (
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div className="navbar-nav ml-auto">
                  <li>
                    <Link to="/login" className="nav-link active">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="nav-link active">
                      Register
                    </Link>
                  </li>
                </div>
              </div>
            )}
          </>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
