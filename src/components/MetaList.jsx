import React, { useEffect, useState } from "react";
import { getGuns, saveMeta, getMeta, deleteMeta } from "../services/api";
import { update } from "firebase/database";
import "../css/MetaList.css";
import GunCard from "./GunCard";
import ElectricBorder from "./ElectricBorder";

const MetaList = ({ setShowMetaList, setShowList, isLoggedIn }) => {
  const [guns, setGuns] = useState(null);
  const [meta, setMeta] = useState(null);
  const [editMeta, setEditMeta] = useState(false);
  const [selectedGun, setSelectedGun] = useState(false);
  const [selectedMeta, setSelectedMeta] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [close, setClose] = useState(true);
  const metaCategory = [
    "Overpowered Guns",
    "Assault Rifles",
    "Sub Machine Guns",
    "Light Machine Guns",
  ];

  const gunCategories = [
    "Assault Rifle",
    "Sub Machine Gun",
    "Light Machine Gun",
    "Shotgun",
    "Marksman Rifle",
    "Sniper Rifle",
  ];
  useEffect(() => {
    const unsubscribeGuns = getGuns((data) => {
      const gunData = data || {};
      setGuns(gunData);
    });
    const unsubscribeMeta = getMeta((data) => {
      const metaData = data || {};
      setMeta(metaData);
    });
    return () => {
      unsubscribeGuns();
      unsubscribeMeta();
    };
  }, []);

  const handleAddMeta = async (gunName, gunType) => {
    if (
      editMeta
        ? Object.keys(meta?.["Overpowered Guns"] ?? {}).length >= 10
        : Object.keys(meta?.[`${gunType}s`] ?? {}).length >= 10
    ) {
      alert(
        "This category already has 10 guns. Remove a gun before adding another.",
      );
      return;
    }
    if (editMeta && !meta?.["Overpowered Guns"]?.[gunName]) {
      const metaData = {
        [gunName]: {
          place: Object.keys(meta?.["Overpowered Guns"] ?? {}).length + 1,
        },
      };

      await saveMeta("Overpowered Guns", metaData);
    }

    if (!editMeta && !meta?.[`${gunType}s`]?.[gunName]) {
      const metaData = {
        [gunName]: {
          place: Object.keys(meta?.[`${gunType}s`] ?? {}).length + 1,
        },
      };

      await saveMeta(`${gunType}s`, metaData);
    }
  };

  const handleClearMeta = async (category) => {
    await deleteMeta(category);
  };

  const handleSelectedGun = (metaGunName) => {
    const selectedMetaGun = Object.entries(guns).filter(
      ([gundId, gun]) => gundId === metaGunName,
    );
    setSelectedMeta(selectedMetaGun[0][1]);
  };
  // console.log(selectedMeta);

  const placeClass = (place) => {
    return `place-${place}`;
  };

  console.log(close);

  return (
    <>
      <div className="w-screen flex justify-center items-center h-full relative py-2.5">
        {selectedMeta && (
          <div>
            <GunCard
              selectedGun={selectedMeta}
              setSelectedGun={setSelectedMeta}
            />
          </div>
        )}
        <ElectricBorder
          color="#d53954"
          speed={0.4}
          chaos={0.1}
          thickness={2}
          style={{ borderRadius: 16 }}
          className={"w-[90vw] max-w-300 h-fit max-h-full"}
        >
          {!selectedMeta && (
            <div className="meta-list-container h-full w-full max-h-150 overflow-y-auto hide-scrollbar text-white rounded-2xl relative p-2.5 backdrop-blur-md border-2 border-red-400 ">
              <div className="gun-meta-list-container  overflow-x-hidden">
                {metaCategory.map((category) => (
                  <div
                    key={category}
                    className="border-2 border-red-400 p-1 rounded-md mb-3  "
                  >
                    <div
                      className={`flex justify-between items-center ${category === "Overpowered Guns" ? `${editMeta ? "bg-green-400" : ""}` : ""}`}
                    >
                      <h1 className="pl-2 text-red-100">{`top 10 ${category}`}</h1>
                      {category === "Overpowered Guns" && isLoggedIn && (
                        <button
                          class="edit-button"
                          onClick={() => setEditMeta((prev) => !prev)}
                        >
                          Edit
                          <svg class="svg" viewBox="0 0 512 512">
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                          </svg>
                        </button>
                      )}
                      {isLoggedIn && (
                        <button onClick={() => handleClearMeta(category)}>
                          Clear
                        </button>
                      )}
                      {category === "Overpowered Guns" && (
                        <button
                          onClick={() => {
                            setShowMetaList(false);
                            setShowList((prev) => !prev);
                          }}
                          className="close-button"
                        >
                          <span className="X"></span>
                          <span className="Y"></span>
                          <div class="close-button-text">Close</div>
                        </button>
                      )}
                    </div>

                    <div className=" grid grid-cols-3 lg:grid-cols-4 gap-2">
                      {meta &&
                        Object.entries(meta)
                          .filter(([metaKey]) => metaKey === category)
                          .map(([metaKey, gun]) =>
                            Object.entries(gun)
                              .sort(([, a], [, b]) => a.place - b.place)
                              .map(([gunName, gunData]) => (
                                <div
                                  key={gunName}
                                  className="text-center"
                                  onClick={() => handleSelectedGun(gunName)}
                                >
                                  <div
                                    className={`border-3 relative  border-red-300 rounded-xl overflow-hidden bg-black/40`}
                                  >
                                    <h2
                                      className={`absolute top-0 left-1/2 translate-x-[-50%] mt-2.5 border-2 rounded-2xl p-1 px-2.5 text-[calc(2px+1vw)] ${placeClass(gunData.place)}`}
                                    >{`TOP ${gunData.place}`}</h2>
                                    {Object.entries(guns)
                                      .filter(([gunId]) => gunId === gunName)
                                      .map(([gunId, gun]) => (
                                        <img
                                          src={gun.iconURL.url}
                                          alt=""
                                          key={gunId}
                                        />
                                      ))}
                                    <p className=" text-red-100 text-[calc(5px+1vw)]">
                                      {gunName}
                                    </p>
                                  </div>
                                </div>
                              )),
                          )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ElectricBorder>
      </div>

      {/* meta editor here */}
      {isLoggedIn && (
        <div
          className={`hide-scrollbar border-2 p-2 max-h-70 ${!close ? "h-100" : "h-17"} overflow-y-auto rounded-md fixed w-full max-w-300 bottom-0 z-10 backdrop-blur-2xl transition-all duration-1000 ease`}
        >
          <div className="flex justify-between items-center">
            <div className="w-full" onClick={() => setClose(false)}>
              <input
                type="text"
                placeholder="Search Gun..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <button
              className={`close-button z-50`}
              onClick={() => setClose(true)}
            >
              <span className="X"></span>
              <span className="Y"></span>
            </button>
          </div>
          {guns &&
            gunCategories.map((gunCategory) => (
              <div key={gunCategory} className="p-2 rounded-md">
                <div className="border-2 mb-2 rounded-md">
                  <p className="">{gunCategory}</p>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {Object.entries(guns)
                    .filter(([gunId, gun]) => gun.gunType === gunCategory)
                    .filter(([gunId, gun]) =>
                      gun.gunName
                        .toLowerCase()
                        .startsWith(searchValue.toLowerCase()),
                    )
                    .map(([gundId, gun]) => (
                      <div
                        key={gundId}
                        className="border-2 rounded-md p-2 bg-amber-500 cursor-pointer"
                        onClick={() => handleAddMeta(gun.gunName, gun.gunType)}
                      >
                        {gun.gunName}
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default MetaList;
