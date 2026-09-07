import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <div className="bg-red-950/20 backdrop-blur-2xl border-t-2 border-red-900 h-25 w-screen fixed bottom-0 flex justify-around items-center sm:px-10 px-2">
      <div className="text-white flex-1  flex flex-col items-center justify-center text-xs sm:text-lg">
        <div className="flex items-center">
          <h1>Donations</h1>
          <img
            src="https://images.seeklogo.com/logo-png/52/2/gcash-logo-png_seeklogo-522261.png"
            alt=""
            className="w-10"
          />
        </div>
        <p>0936-263-9330</p>
      </div>
      <div className="flex-1 ">
        <img
          src="https://www.pngarts.com/files/8/Call-of-Duty-Mobile-Logo-PNG-Image.png"
          alt=""
          className="w-30 m-auto"
        />
      </div>

      <div className="flex-1 ">
        <ul className="icon-wrapper">
          <a
            href="https://www.facebook.com/jozephjrperez/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className="icon facebook">
              <span className="tooltip">Facebook</span>
              <svg
                viewBox="0 0 320 512"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[1em] sm:h-[1.2em]"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
              </svg>
            </li>
          </a>
          <a
            href="https://discord.gg/jzaKD4CeJa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className="icon discord">
              <span className="tooltip">Discord</span>
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="discord sm:h-8 h-6"
              >
                <path d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"></path>
              </svg>
            </li>
          </a>
          <a
            href="https://www.instagram.com/romeobndct/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className="icon instagram">
              <span className="tooltip">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.2em"
                fill="currentColor"
                className="bi bi-instagram"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
              </svg>
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
