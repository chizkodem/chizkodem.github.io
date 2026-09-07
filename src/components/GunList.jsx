import React, { useEffect, useState } from "react";
import { getGuns, deleteImage, deleteGun } from "../services/api";
import GunCard from "./GunCard";
import "../css/GunList.css";
import ElectricBorder from "./ElectricBorder";
import { div } from "motion/react-client";

const GunList = ({
  setShowList,
  showList,
  showGuns,
  setShowGuns,
  setShowMetaList,
  showMetaList,
  selectedCategory,
  isLoggedIn,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [guns, setGuns] = useState({});
  const [imageLoaded, setImageLoaded] = useState({});
  const gunCategories = [
    "Assault Rifle",
    "Sub Machine Gun",
    "Light Machine Gun",
    "Shotgun",
    "Marksman Rifle",
    "Sniper Rifle",
    "Pistol",
    "Extras",
  ];
  const [selectedGun, setSelectedGun] = useState(null);

  const showGun = (gun) => {
    setSelectedGun(gun);
  };

  useEffect(() => {
    const unsubscribe = getGuns(async (data) => {
      const gunData = data || {};

      for (const [gunId, gun] of Object.entries(gunData)) {
        if (!gun.builds || Object.keys(gun.builds).length === 0) {
          console.log(`Deleting empty gun: ${gunId}`);

          if (gun.iconURL?.publicId) {
            await deleteImage(gun.iconURL.publicId);
          }

          await deleteGun(gunId);
        }
      }

      const validGuns = Object.fromEntries(
        Object.entries(gunData).filter(
          ([, gun]) => gun.builds && Object.keys(gun.builds).length > 0,
        ),
      );

      setGuns(validGuns);
    });

    return () => unsubscribe();
  }, []);

  const handleLoadImage = () => {
    setImageLoaded(true);
  };
  console.log(imageLoaded);

  return (
    <div className="flex justify-center items-center relative mt-2.5 w-full h-full max-h-full py-2.5">
      <ElectricBorder
        color="#d53954"
        speed={0.4}
        chaos={0.1}
        thickness={2}
        style={{ borderRadius: 16 }}
        className={"w-full max-w-300 h-fit max-h-full"}
      >
        {!selectedGun && !showMetaList && (
          <div className="border-2 p-2.5 pb-0 rounded-lg border-red-400 backdrop-blur-sm  min-h-75 max-w-[90vw] min-w-75">
            <div className="flex justify-between items-center mb-3">
              {/* search bar */}
              <div
                className="input-wrapper"
                onBlur={() => setSearchFocus(searchValue ? true : false)}
              >
                <button className="search-button-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="25px"
                    width="25px"
                  >
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      stroke="#fff"
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    ></path>
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      stroke="#fff"
                      d="M22 22L20 20"
                    ></path>
                  </svg>
                </button>
                <input
                  placeholder="Search Gun..."
                  className="input"
                  name="text"
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onBlur={() => {
                    setSearchFocus(searchValue ? true : false);
                    setSearchValue(searchValue ? searchValue : "");
                  }}
                />
              </div>
              <button
                className={`close-button`}
                onClick={() => {
                  setShowGuns((prev) => !prev);
                  setShowList((prev) => !prev);
                }}
              >
                <span className="X"></span>
                <span className="Y"></span>
                <div className="close-button-text">Close</div>
              </button>
            </div>

            <div className="flex flex-col items-center ">
              {gunCategories
                .filter((category) => category === selectedCategory)
                .map((category) => (
                  <div
                    key={category}
                    className="flex flex-col w-full items-center "
                  >
                    <div className="p-2.5 px-20 text-center border-2 border-red-400 rounded-3xl text-red-200 mb-2.5">
                      <h2>{category}</h2>
                    </div>
                    <div className="w-full grid grid-cols-3 overflow-y-auto md:grid-cols-4 gap-2.5 p-2.5 max-h-100 justify-center text-[calc(5.5px+1vw)] hide-scrollbar">
                      {Object.entries(guns)
                        .filter(([, gun]) => gun.gunType === category)
                        .filter(([, gun]) =>
                          gun.gunName
                            .toLowerCase()
                            .startsWith(searchValue.toLocaleLowerCase()),
                        )
                        .map(([gunId, gun]) => (
                          <div
                            className="gun-card-container cursor-pointer p-1 text-red-200 text-center"
                            key={gunId}
                            onClick={() => showGun(gun)}
                          >
                            {!imageLoaded[gunId] && (
                              <div class="relative flex w-full aspect-2/1 animate-pulse gap-2 p-4 rounded-2xl border-2 border-red-300">
                                <div class="h-12 w-12 rounded-full bg-slate-400"></div>
                                <div class="flex-1">
                                  <div class="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                                  <div class="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                                </div>
                                <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
                              </div>
                            )}
                            <img
                              src={gun.iconURL.url}
                              alt={gun.gunName}
                              className={`rounded-2xl border-2 border-red-300 ${imageLoaded[gunId] ? "block" : "hidden"}`}
                              onLoad={() =>
                                setImageLoaded((prev) => ({
                                  ...prev,
                                  [gunId]: true,
                                }))
                              }
                            />
                            <p className="text-shadow-lg">{gun.gunName}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </ElectricBorder>
      {selectedGun && (
        <div className="">
          <GunCard
            selectedGun={selectedGun}
            setSelectedGun={setSelectedGun}
            isLoggedIn={isLoggedIn}
          />
        </div>
      )}
    </div>
  );
};

export default GunList;
