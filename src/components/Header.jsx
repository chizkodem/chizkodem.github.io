import {useState, useRef} from "react";

const Header = ({onToggleLightbox}) => {
  const [isChecked, setIsChecked] = useState(false);
  const collapseRef = useRef(null);

  document.addEventListener("click", (event) => {
    // console.log(event.target);

    if (
      (!event.target.classList.contains("lightbox-content") &&
        event.target.classList.contains("toggle") &&
        event.target.id.includes("checkbox")) ||
      event.target.id.includes("lightbox-cover")
    ) {
      unCheck();
    }
  });

  const handleIsDarkCheckBox = (element) => {
    if (element.target.checked) {
      document.documentElement.style.setProperty(
        "--header-background-color",
        "rgba(73, 73, 73, 0.584)"
      );
      document.documentElement.style.setProperty(
        "--header-border-color",
        "rgba(0, 0, 0, 0.753)"
      );
      document.documentElement.style.setProperty(
        "--header-shadow-color",
        "rgba(133, 133, 133, 0.308)"
      );
      document.documentElement.style.setProperty(
        "--plschange-color",
        "rgb(233, 233, 233)"
      );
      document.documentElement.style.setProperty(
        "--plschange-color-2",
        "rgb(0, 0, 0)"
      );
      document.documentElement.style.setProperty(
        "--common-color",
        "rgb(255, 255, 255)"
      );
      document.documentElement.style.setProperty(
        "--body-color",
        "rgba(0, 0, 0, 0.507)"
      );
      document.documentElement.style.setProperty(
        "--attach-color",
        "rgba(99, 99, 99, 0.781)"
      );
      document.documentElement.style.setProperty(
        "--navbar-img",
        "invert(100%)"
      );
      document.documentElement.style.setProperty(
        "--light-box-background",
        "rgba(54, 54, 54, 0.929)"
      );
      document.documentElement.style.setProperty(
        "--active-img-btn-color",
        "rgba(62, 170, 76, 0.671)"
      );
      document.documentElement.style.setProperty(
        "--top-glow-color",
        "rgb(233, 75, 233)"
      );
      document.documentElement.style.setProperty(
        "--bottom-glow-color",
        "rgb(0, 255, 213)"
      );
      document.documentElement.style.setProperty(
        "--top-text-glow-color",
        "#00a5ce"
      );
      document.documentElement.style.setProperty(
        "--bottom-text-glow-color",
        "#a10aa1"
      );
    } else {
      document.documentElement.style.setProperty(
        "--header-background-color",
        "rgba(255, 255, 255, 0.384)"
      );
      document.documentElement.style.setProperty(
        "--header-border-color",
        "rgba(255, 255, 255, 0.753)"
      );
      document.documentElement.style.setProperty(
        "--header-shadow-color",
        "rgba(53, 53, 53, 0.308)"
      );
      document.documentElement.style.setProperty("--plschange-color", "black");
      document.documentElement.style.setProperty(
        "--plschange-color-2",
        "white"
      );
      document.documentElement.style.setProperty(
        "--common-color",
        "rgb(255, 255, 255)"
      );
      document.documentElement.style.setProperty(
        "--body-color",
        "rgba(255, 255, 255, 0)"
      );
      document.documentElement.style.setProperty(
        "--attach-color",
        "rgba(255, 255, 255, 0.644)"
      );
      document.documentElement.style.setProperty("--navbar-img", "invert(0)");
      document.documentElement.style.setProperty(
        "--light-box-background",
        "rgba(212, 212, 212, 0.774)"
      );
      document.documentElement.style.setProperty(
        "--active-img-btn-color",
        "rgba(62, 170, 76, 0.671)"
      );
      document.documentElement.style.setProperty(
        "--top-glow-color",
        "rgb(233, 75, 233)"
      );
      document.documentElement.style.setProperty(
        "--bottom-glow-color",
        "rgb(0, 255, 213)"
      );
      document.documentElement.style.setProperty(
        "--top-text-glow-color",
        "#59ceeb"
      );
      document.documentElement.style.setProperty(
        "--bottom-text-glow-color",
        "#e65ee6"
      );
    }
  };

  const unCheck = () => {
    setIsChecked(false);
    if (collapseRef.current) {
      collapseRef.current.classList.remove("reveal");
    }
    onToggleLightbox(false);
  };

  const handleCheckboxChange = (element) => {
    setIsChecked(element.target.checked);
    if (element.target.checked) {
      onToggleLightbox(true);

      collapseRef.current?.classList.add("reveal");
    } else {
      collapseRef.current.classList.remove("reveal");
      onToggleLightbox(false);
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <a href="#HOME">Chiz</a>
        <label aria-checked="false" role="switch" className="switch">
          <input type="checkbox" onChange={handleIsDarkCheckBox} />
          <span className="slider">
            <span className="slider-inner"></span>
          </span>
        </label>
      </div>
      <nav className="navbar">
        <ul>
          <div className="collapse" ref={collapseRef} onClick={unCheck}>
            <li className="highLight">
              <a href="#AR" className="ar-sub ">
                <img
                  src="https://raw.githubusercontent.com/chizkodem/images-storage/4fe072ecb16834ea422a580e7a2de0db4cedf836/AR.svg"
                  alt=""
                  className="navbar-icons"
                />
                <span>AR</span>
              </a>
            </li>
            <li className="highLight">
              <a href="#SMG">
                <img
                  src="https://raw.githubusercontent.com/chizkodem/images-storage/4fe072ecb16834ea422a580e7a2de0db4cedf836/SMG.svg"
                  alt=""
                  className="navbar-icons"
                />
                <span>SMG</span>
              </a>
            </li>
            <li className="highLight">
              <a href="#SG">
                <img
                  src="https://raw.githubusercontent.com/chizkodem/images-storage/4fe072ecb16834ea422a580e7a2de0db4cedf836/SG.svg"
                  alt=""
                  className="navbar-icons"
                />
                <span>SG</span>
              </a>
            </li>
            <li className="highLight">
              <a href="#MM">
                <img
                  src="https://raw.githubusercontent.com/chizkodem/images-storage/4fe072ecb16834ea422a580e7a2de0db4cedf836/MM.svg"
                  alt=""
                  className="navbar-icons"
                />
                <span>MM</span>
              </a>
            </li>
            <li className="highLight">
              <a href="#SR">
                <img
                  src="https://raw.githubusercontent.com/chizkodem/images-storage/4fe072ecb16834ea422a580e7a2de0db4cedf836/SR.svg"
                  alt=""
                  className="navbar-icons"
                />
                <span>SR</span>
              </a>
            </li>
            <li className="highLight">
              <a href="#LMG">
                <img
                  src="https://raw.githubusercontent.com/chizkodem/images-storage/4fe072ecb16834ea422a580e7a2de0db4cedf836/LMG.svg"
                  alt=""
                  className="navbar-icons"
                />
                <span>LMG</span>
              </a>
            </li>
            <li className="highLight">
              <a href="#HG">
                <img
                  src="https://raw.githubusercontent.com/chizkodem/images-storage/4fe072ecb16834ea422a580e7a2de0db4cedf836/Secondary.svg"
                  alt=""
                  className="navbar-icons"
                />
                <span>2ND</span>
              </a>
            </li>
            <li className="extras highLight">
              <a href="#EXTRAS">
                <img src="icons/extras.svg" alt="" className="navbar-extras" />
                <span>extras</span>
              </a>
            </li>
          </div>
          <li className="checkbox-li">
            <a href="#MORE">
              <input
                id="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label className="toggle" htmlFor="checkbox">
                <div id="bar1" className="bars"></div>
                <div id="bar2" className="bars"></div>
                <div id="bar3" className="bars"></div>
              </label>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
