import React, { useEffect, useState } from "react";
import "../css/HomePage.css";
import { getGuns } from "../services/api";
import { gunCategories } from "../services/GunCategories";
import ElectricBorder from "./ElectricBorder";

const HomePage = ({
  setShowList,
  showList,
  showGuns,
  setShowGuns,
  setSelectedCategory,
}) => {
  const [transition, setTransition] = useState(false);
  useEffect(() => {
    setTransition(true);
  }, []);
  const imageSources = {
    "Assault Rifle":
      "https://raw.githubusercontent.com/chizkodem/images-storage/886f42f9fb0f91083356cf16681461e9d89f4038/Assault%20Rifle.svg",
    "Sub Machine Gun":
      "https://raw.githubusercontent.com/chizkodem/images-storage/aac0a4d2c706806709d0675a2c76fe9e6c6ca7ba/Sub%20Machine%20Gun.svg",
    "Light Machine Gun":
      "https://raw.githubusercontent.com/chizkodem/images-storage/886f42f9fb0f91083356cf16681461e9d89f4038/Light%20Machine%20Gun.svg",
    Shotgun:
      "https://raw.githubusercontent.com/chizkodem/images-storage/aac0a4d2c706806709d0675a2c76fe9e6c6ca7ba/Shotgun.svg",
    "Marksman Rifle":
      "https://raw.githubusercontent.com/chizkodem/images-storage/886f42f9fb0f91083356cf16681461e9d89f4038/MM.svg",
    "Sniper Rifle":
      "https://raw.githubusercontent.com/chizkodem/images-storage/886f42f9fb0f91083356cf16681461e9d89f4038/SR.svg",
    Pistol:
      "https://raw.githubusercontent.com/chizkodem/images-storage/aac0a4d2c706806709d0675a2c76fe9e6c6ca7ba/Secondary.svg",
    Extras:
      "https://res.cloudinary.com/hcy9uyaa/image/upload/v1788768282/Extras.svg",
  };
  return (
    <>
      {showGuns && (
        <div
          className={`homepage-container flex justify-center w-screen items-center h-full text-[calc(6px+0.9vw)]`}
        >
          <ElectricBorder
            color="#d53954"
            speed={0.4}
            chaos={0.1}
            thickness={2}
            style={{ borderRadius: 16 }}
            className={` p-5 flex justify-center backdrop-blur-sm h-fit max-h-full`}
          >
            <div className="category-buttons-container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 h-fit w-full max-w-[90vw]">
              {gunCategories.map((category, index) => (
                <div
                  key={category}
                  className={`category-buttons p-4 cursor-pointer aspect-19/10 border-2 border-red-400 rounded-2xl mx-auto`}
                  onClick={() => {
                    setShowList((prev) => !prev);
                    setShowGuns((prev) => !prev);
                    setSelectedCategory(category);
                  }}
                >
                  <div className="w-full h-full flex flex-col justify-center items-center">
                    <p className="text-white text-center ">{category}</p>
                    <div>
                      <img
                        src={imageSources[category]}
                        alt=""
                        className="w-full h-full invert aspect-10/2 homepage-category-images"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ElectricBorder>
        </div>
      )}
    </>
  );
};

export default HomePage;
