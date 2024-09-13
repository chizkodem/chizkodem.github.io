import React, {useEffect, useState} from "react";
import Lightboxbtn from "./Lightboxbtn";

let imgSrcs;
export const functionTest = (imageVariations) => {
  imgSrcs = imageVariations;
};

export const loadingImg = (gunName, attachSrc) => {
  const src = `${attachSrc}${gunName}.jpg`;
  const image = new Image();
  image.src = src;

  image.onload = () => {
    const attachImg = document.getElementById("img");
    const loadingCover = document.getElementById("lightbox-cover");
    loadingCover.classList.add("show");

    setTimeout(() => {
      if (attachImg) {
        attachImg.classList.add("load");
      }

      // Function to update image size based on viewport while maintaining aspect ratio
      const updateImageSize = () => {
        const attachImgLoad = document.querySelector(".attach-img.load");
        const lbImgCon = document.getElementById("lightbox-img-container");
        const loadingIcon = document.getElementById("loading-icon");
        if (attachImgLoad) {
          loadingIcon.style.display = "block";
          attachImgLoad.style.opacity = "100%";
        }
        if (attachImgLoad) {
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // Calculate size based on image aspect ratio
          const aspectRatio = image.width / image.height;

          let newWidth = viewportWidth * 0.8; // or any percentage you prefer
          let newHeight = newWidth / aspectRatio;

          if (newHeight > viewportHeight * 0.6) {
            // or any percentage you prefer
            newHeight = viewportHeight * 0.7;
            newWidth = newHeight * aspectRatio;
          }

          lbImgCon.style.width = `${newWidth}px`;
          lbImgCon.style.height = `${newHeight}px`;

          setTimeout(() => {
            loadingIcon.style.display = "none";
            attachImgLoad.style.width = `calc(${newWidth}px - 10px)`;
            attachImgLoad.style.height = `calc(${newHeight}px - 10px)`;
          }, 500);
        }
      };

      // Initial size update
      updateImageSize();

      // Optional: Add an event listener to handle window resize
      window.addEventListener("resize", updateImageSize);

      // Clean up event listener when component unmounts
      return () => {
        window.removeEventListener("resize", updateImageSize);
      };
    }, 100);
  };
};

const Lightbox = ({gunName, attachSrc, isOpen}) => {
  useEffect(() => {
    if (isOpen) {
      loadingImg(gunName, attachSrc); // Trigger the function when component is mounted or `isOpen` changes
    }
  }, [isOpen]); // Only runs when `isOpen` changes
  // console.log(gunName, attachSrc, "testing");

  if (!isOpen) return null;

  return (
    <>
      <div className="lightbox" id="lightbox">
        <div className="lightbox-content">
          <Lightboxbtn list={imgSrcs} gunName={gunName} attachSrc={attachSrc} />
          <div className="lightbox-img-container" id="lightbox-img-container">
            <div className="loading-icon-container">
              <img
                src="icons/loading.png"
                alt=""
                className="loading-icon"
                id="loading-icon"
              />
            </div>
            <img
              src={`${attachSrc}${gunName}.jpg`}
              alt="Selected Weapon"
              className="attach-img"
              id="img"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Lightbox;
