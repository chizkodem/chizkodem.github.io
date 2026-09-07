import React from "react";
import { useState } from "react";
import "../css/LoginPage.css";
import { login } from "../services/api";

const LoginPage = ({ setIsLoggedIn, setShowList, setShowLogin }) => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  console.log(userName, passWord);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(userName, passWord);
      setIsLoggedIn(true);
      setUserName("");
      setPassWord("");
      setShowLogin(false);
      console.log("logged in:", user);
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="absolute w-screen h-screen z-10 top-0 left-0 items-center backdrop-blur-md">
      <div class="glitch-form-wrapper">
        <form class="glitch-card" onSubmit={handleLogin}>
          <div class="card-header">
            <div class="card-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                <path d="M12 11.5a3 3 0 0 0 -3 2.824v1.176a3 3 0 0 0 6 0v-1.176a3 3 0 0 0 -3 -2.824z"></path>
              </svg>
              <span>SI CHIZ KABA BOI?</span>
            </div>

            <div class="card-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div class="card-body">
            <div class="form-group">
              <input
                type="text"
                id="username"
                name="username"
                required=""
                placeholder=""
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label for="username" class="form-label" data-text="USERNAME">
                USERNAME
              </label>
            </div>

            <div class="form-group">
              <input
                type="password"
                id="password"
                name="password"
                required=""
                placeholder=""
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
              />
              <label for="password" class="form-label" data-text="ACCESS_KEY">
                ACCESS_KEY
              </label>
            </div>

            <button
              data-text="INITIATE_CONNECTION"
              type="submit"
              class="submit-btn"
            >
              <span class="btn-text">INITIATE_CONNECTION</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
