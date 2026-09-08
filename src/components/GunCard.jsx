import React, { useState } from "react";
import { deleteImage, saveGun } from "../services/api";
import { update } from "firebase/database";
import "../css/GunCard.css";
import ElectricBorder from "./ElectricBorder";

const GunCard = ({ selectedGun, setSelectedGun, isLoggedIn }) => {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const firstBuild =
    selectedGun.builds.Main ?? Object.values(selectedGun.builds)[0];

  const [selectedBuild, setSelectedBuild] = useState(firstBuild.imgURL.url);
  const [displayedGun, setDisplayedGun] = useState(
    selectedGun.builds.Main ? "Main" : Object.keys(selectedGun.builds)[0],
  );
  const [imageLoaded, setImageLoaded] = useState({});

  // console.log(selectedGun.builds[displayedGun].code);
  // console.log(displayedGun);

  const handleChangeBuild = (imgURL) => {
    setSelectedBuild(imgURL);
  };

  const handleDelete = async (publicId, buildId) => {
    await deleteImage(publicId);
    const gunData = { [`builds/${buildId}`]: null };
    await saveGun(selectedGun.gunName, gunData);
    setSelectedGun((prev) => {
      const updatedGun = { ...prev, builds: { ...prev.builds } };
      delete updatedGun.builds[buildId];
      setShowDeleteButton(false);
      return updatedGun;
    });
    setDisplayedGun(Object.keys(selectedGun.builds)[0]);
    setSelectedBuild(firstBuild.imgURL.url);
    setSelectedGun(null);
  };

  return (
    <div className=" flex items-center justify-center w-screen transition-all duration-1000 ease">
      <ElectricBorder
        color="#d53954"
        speed={0.4}
        chaos={0.1}
        thickness={2}
        style={{ borderRadius: 16 }}
        className="text-center w-fit max-w-300 h-fit backdrop-blur-lg"
      >
        {showDeleteButton && (
          <div className="delete-button-box absolute top-[50%] z-10 -translate-y-1/2 backdrop-blur-md w-full h-fit flex items-center justify-center rounded-4xl">
            <div className="delete-button-container bg-blue-950 text-red-300 p-5 border-red-700 border-2 rounded-2xl max-w-75">
              <p className="text-3xl text-center">{`Are you sure you want to delete ${deleteTarget.buildId} build?`}</p>
              <div className="button-container flex justify-around mt-3 gap-2">
                <button
                  className="bg-red-800 w-25 text-2xl font-bold"
                  onClick={() =>
                    handleDelete(deleteTarget.publicId, deleteTarget.buildId)
                  }
                >
                  YES
                </button>
                <button
                  className="bg-green-500 w-25 text-2xl font-bold"
                  onClick={() => setShowDeleteButton((prev) => !prev)}
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`${isLoggedIn ? "pb-12" : ""} relative flex flex-col items-center p-5 w-full max-w-200`}
        >
          <h1 className="text-3xl text-white">{selectedGun.gunName}</h1>
          <div className="flex flex-wrap justify-center">
            {Object.entries(selectedGun.builds).map(([buildId, build]) => (
              <div key={buildId}>
                <div className="radio-wrapper">
                  <input
                    className="input"
                    name="build"
                    id={`build-${buildId}`}
                    type="radio"
                    checked={buildId === displayedGun}
                    onChange={() => {
                      handleChangeBuild(build.imgURL.url);
                      setDisplayedGun(buildId);
                    }}
                  />

                  <label className="btn" htmlFor={`build-${buildId}`}>
                    {buildId}

                    <span className="btn__glitch" aria-hidden="true">
                      {buildId}
                    </span>

                    <span className="number">chiz</span>
                  </label>
                </div>

                {isLoggedIn && (
                  <button
                    style={{
                      display:
                        buildId === displayedGun && !showDeleteButton
                          ? ""
                          : "none",
                    }}
                    className="delete-button noselect absolute left-1/2 translate-x-[-50%] bottom-0"
                    onClick={() => {
                      setShowDeleteButton((prev) => !prev);
                      setDeleteTarget({
                        publicId: build.imgURL.publicId,
                        buildId: buildId,
                      });
                    }}
                  >
                    <span class="text text-xs">{`Delete ${buildId} build`}</span>
                    <span class="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
          {!imageLoaded[displayedGun] && (
            <div class="relative flex w-full aspect-2/1 items-center justify-center animate-pulse gap-2 p-4 rounded-2xl border-2 border-red-300">
              <div class="h-12 w-12 rounded-full bg-slate-400"></div>
              <div class="flex-1">
                <div class="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                <div class="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
              </div>
              <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
            </div>
          )}
          <div
            className={`max-w-142 max-h-120 border-4 rounded-2xl border-red-400/50 ${imageLoaded[displayedGun] ? "block" : "hidden"} overflow-y-auto hide-scrollbar`}
          >
            <img
              src={selectedBuild}
              alt=""
              onClick={() => setSelectedGun(null)}
              onLoad={() =>
                setImageLoaded((prev) => ({
                  ...prev,
                  [displayedGun]: true,
                }))
              }
            />
          </div>
          {selectedGun.builds[displayedGun].code && (
            <p className="text-white">{`Code: ${selectedGun.builds[displayedGun].code}`}</p>
          )}
        </div>
      </ElectricBorder>
    </div>
  );
};

export default GunCard;
