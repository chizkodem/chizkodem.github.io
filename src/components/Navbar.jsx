import React, { useEffect, useState } from "react";
import "../css/navbar.css";
import { logout } from "../services/api";

const Navbar = ({
  showList,
  setShowList,
  setShowMetaList,
  setShowLogin,
  showForm,
  setShowForm,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      alert("you logged out");
    } catch (error) {
      alert("Failed to logout");
    }
  };

  return (
    <div className="navbar z-21 fixed w-screen top-0 left-0 h-25">
      <h1 className="ml-5">CHIZ</h1>
      <div className="flex items-center gap-2.5">
        {!showForm && (
          <button
            className=" bg-red-900"
            onClick={() => {
              setShowMetaList((prev) => !prev);
              setShowList((prev) => !prev);
            }}
          >
            Meta
          </button>
        )}

        {isLoggedIn && (
          <button
            className="navbar-button"
            onClick={() => setShowForm((prev) => !prev)}
          >
            Add gun
          </button>
        )}
        {!isLoggedIn && (
          <div
            aria-label="User Login Button"
            tabIndex="0"
            role="button"
            className="user-profile"
          >
            <div
              className="user-profile-inner"
              onClick={() => setShowLogin((prev) => !prev)}
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g data-name="Layer 2" id="Layer_2">
                  <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z"></path>
                </g>
              </svg>
            </div>
          </div>
        )}
        {isLoggedIn && (
          <button className="logout-button" onClick={handleLogout}>
            <div className="logout-button-sign">
              <svg viewBox="0 0 512 512">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>

            <div className="logout-button-text">Logout</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
