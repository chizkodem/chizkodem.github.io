import React, {useEffect, useRef, useState} from "react";
import {loadingImg} from "./Lightbox";
import "./Glitch.css";

const changeImg = (src) => {
  const img = document.getElementById("img");
  img.src = src;
};

const callLoadImg = (gunName, attachSrc, src) => {
  const attachImgLoad = document.querySelector(".attach-img.load");
  attachImgLoad.style.height = `0px`;
  attachImgLoad.style.opacity = "0%";
  attachImgLoad.classList.remove("load");

  const loadingIcon = document.getElementById("loading-icon");
  loadingIcon.style.display = "block";
  // console.log(src);

  setTimeout(() => {
    loadingImg(gunName, attachSrc, src);
  }, 500);
};

const getAttachName = (src) => {
  if (!src) return "";
  if (src.includes("red-dot-type")) {
    return "red-dot";
  }
  if (src.includes("pin-point")) {
    return "pin-point";
  }
  if (src.includes("ar-type")) {
    return "ar build";
  }
  if (src.includes("burst-type")) {
    return "burst";
  }
  if (src.includes("smg-type")) {
    return "smg-build";
  }
  if (src.includes("gyro")) {
    return "gyro";
  }
  if (src.includes("sniper")) {
    return "sniper";
  } else return "main";
};

const Lightboxbtn = ({list, gunName, attachSrc}) => {
  const isLoaded = useRef(false); // Tracks if the effect has run
  const [buttons, setButtons] = useState([]); // State to store buttons
  const [selected, setSelected] = useState(0); // Track the selected button

  useEffect(() => {
    if (!isLoaded.current) {
      const Srcs = list || []; // Ensure Srcs is an array
      const newButtons = Array(Srcs.length).fill(null); // Pre-fill an array with the same length
      let processedImages = 0;
      // console.log(newButtons);

      Srcs.forEach((src, index) => {
        const image = new Image();
        image.src = src;

        image.onload = () => {
          newButtons[index] = src; // Ensure images are stored at their original index
          processedImages++;

          // Only set the buttons once all images are either loaded or errored
          if (processedImages === Srcs.length) {
            console.log("All images processed, setting buttons:", newButtons);
            setButtons(newButtons);
          }
        };

        image.onerror = () => {
          processedImages++;

          // Only create buttons if there are at least two successfully loaded images
          if (processedImages === Srcs.length) {
            console.log(
              "All images processed with errors, setting buttons:",
              newButtons
            );
            setButtons(newButtons);
          }
        };
      });

      isLoaded.current = true;
    }
  }, [list]);

  const callFunctions = (src, index) => {
    changeImg(src);
    setSelected(index);
    callLoadImg(gunName, attachSrc, src);
  };

  const renderButtons = () => {
    const buttonsLength = [];
    buttons.map((button) => {
      if (button) buttonsLength.push(button);
    });

    if (buttonsLength.length === 1) return null;

    return buttons.map((src, index) => {
      if (!src) return null;

      return (
        <button
          className={`img-btns img-btn-${index} ${
            index === selected ? "active" : ""
          }`}
          key={index}
          id={`img-btn-${index}`}
          onClick={() => {
            callFunctions(src, index);
          }}
        >
          {getAttachName(src)}
        </button>
      );
    });
  };

  return (
    <>
      <div className="image-buttons" id="image-buttons">
        {renderButtons()}
      </div>
    </>
  );
};

export default Lightboxbtn;
