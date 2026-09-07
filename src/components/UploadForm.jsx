import React, { useEffect } from "react";
import { useState } from "react";
import { uploadImage, saveGun, deleteImage, getGuns } from "../services/api";
import ImageDropZone from "./ImageDropZone";

const UploadForm = () => {
  const [guns, setGuns] = useState(null);
  const [attachImage, setAttachImage] = useState(null);
  const [iconImage, setIconImage] = useState(null);
  const [buildType, setBuildType] = useState("");
  const [gunType, setGunType] = useState("");
  const [gunName, setGunName] = useState("");
  const [codeValue, setCodeValue] = useState("");

  useEffect(() => {
    const unsubscribe = getGuns((data) => {
      setGuns(data || {});
    });
    return () => unsubscribe;
  }, []);

  // console.log(guns);

  const handleBuildTypeChange = (e) => {
    setBuildType(e.target.value);
  };

  const handleGunTypeChange = (e) => {
    setGunType(e.target.value);
  };

  const handleUploadImage = async () => {
    // if (!attachImage || !gunName || !buildType || !gunType) {
    //   return;
    // }

    const foundGun = Object.entries(guns).find(
      ([gunKey]) => gunKey === gunName,
    );

    let foundBuild;
    if (foundGun) {
      foundBuild = Object.entries(foundGun[1].builds).find(
        ([buildKey]) => buildKey === buildType,
      );
      console.log(foundBuild);
    }

    if (!foundGun && !iconImage) {
      alert("Please upload an icon image");
      return;
    }

    if (foundGun && iconImage && !attachImage) {
      const oldIconImage = foundGun[1].iconURL?.publicId;

      const uploadedIcon = await uploadImage(iconImage);

      if (oldIconImage) {
        await deleteImage(oldIconImage);
      }

      await saveGun(gunName, {
        iconURL: uploadedIcon,
      });

      setIconImage(null);

      console.log("Icon updated:", uploadedIcon);
      return;
    }

    let uploadedIcon;
    let uploadedAttachImage;

    if (iconImage) {
      uploadedIcon = await uploadImage(iconImage);
    }

    if (attachImage) {
      uploadedAttachImage = await uploadImage(attachImage);
    }

    if (foundGun && iconImage) {
      const oldIconImage = foundGun[1].iconURL.publicId;
      await deleteImage(oldIconImage);
    }

    if (foundBuild && attachImage) {
      const oldAttachImage = foundBuild[1].imgURL.publicId;
      await deleteImage(oldAttachImage);
    }

    const gunData = {
      gunName,
      [`builds/${buildType}`]: {
        imgURL: uploadedAttachImage,
        code: codeValue ? codeValue : null,
      },
      gunType,
    };

    if (uploadedIcon) {
      gunData.iconURL = uploadedIcon;
    }

    await saveGun(gunName, gunData);

    setAttachImage(null);
    setIconImage(null);
    console.log("Uploaded:", gunData);
  };

  console.log(codeValue);

  return (
    <section className="form-container absolute z-20">
      <div className={`form`}>
        <div className="flex flex-col items-center">
          <input
            type="text"
            className="gun-name-input border rounded-lg"
            placeholder="Gun name..."
            value={gunName}
            onChange={(e) => setGunName(e.target.value)}
            id="GunName"
          />
          <ImageDropZone
            setAttachImage={setAttachImage}
            setIconImage={setIconImage}
            attachImage={attachImage}
            iconImage={iconImage}
          />
        </div>

        <div className="build-type-container flex flex-col items-center">
          <h2>built type</h2>

          <ul>
            <li
              className={`gun-radio ${buildType === "Main" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="buildType"
                value="Main"
                id="main"
                checked={buildType === "Main"}
                onChange={handleBuildTypeChange}
              />
              <label htmlFor="main">Main</label>
            </li>
            <li
              className={`gun-radio ${buildType === "Red Dot" ? "selected" : ""}`}
            >
              {" "}
              <input
                type="radio"
                name="buildType"
                value="Red Dot"
                id="reddot"
                checked={buildType === "Red Dot"}
                onChange={handleBuildTypeChange}
              />
              <label htmlFor="reddot">Red dot</label>
            </li>
            <li
              className={`gun-radio ${buildType === "AR build" ? "selected" : ""}`}
            >
              {" "}
              <input
                type="radio"
                name="buildType"
                value="AR build"
                id="arbuild"
                checked={buildType === "AR build"}
                onChange={handleBuildTypeChange}
              />
              <label htmlFor="arbuild">AR</label>
            </li>
            <li
              className={`gun-radio ${buildType === "SMG build" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="buildType"
                value="SMG build"
                id="smgbuild"
                checked={buildType === "SMG build"}
                onChange={handleBuildTypeChange}
              />
              <label htmlFor="smgbuild">SMG</label>
            </li>
          </ul>
          <input
            type="text"
            placeholder="Custom Build Type"
            className="border rounded-lg pl-1.5"
            value={buildType}
            onChange={handleBuildTypeChange}
          />
        </div>

        <div className="gun-type-container">
          <h2>Gun type</h2>
          <ul>
            <li
              className={`gun-radio ${gunType === "Assault Rifle" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="guntype"
                value="Assault Rifle"
                id="ar"
                checked={gunType === "Assault Rifle"}
                onChange={handleGunTypeChange}
              />
              <label htmlFor="ar">AR</label>
            </li>
            <li
              className={`gun-radio ${gunType === "Sub Machine Gun" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="guntype"
                value="Sub Machine Gun"
                id="smg"
                checked={gunType === "Sub Machine Gun"}
                onChange={handleGunTypeChange}
              />
              <label htmlFor="smg">SMG</label>
            </li>
            <li
              className={`gun-radio ${gunType === "Light Machine Gun" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="guntype"
                value="Light Machine Gun"
                id="lmg"
                checked={gunType === "Light Machine Gun"}
                onChange={handleGunTypeChange}
              />
              <label htmlFor="lmg">LMG</label>
            </li>
            <li
              className={`gun-radio ${gunType === "Shotgun" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="guntype"
                value="Shotgun"
                id="sg"
                checked={gunType === "Shotgun"}
                onChange={handleGunTypeChange}
              />
              <label htmlFor="sg">SG</label>
            </li>
            <li
              className={`gun-radio ${gunType === "Marksman Rifle" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="guntype"
                value="Marksman Rifle"
                id="mm"
                checked={gunType === "Marksman Rifle"}
                onChange={handleGunTypeChange}
              />
              <label htmlFor="mm">MM</label>
            </li>
            <li
              className={`gun-radio ${gunType === "Sniper Rifle" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="guntype"
                value="Sniper Rifle"
                id="sr"
                checked={gunType === "Sniper Rifle"}
                onChange={handleGunTypeChange}
              />
              <label htmlFor="sr">SR</label>
            </li>
            <li
              className={`gun-radio ${gunType === "Pistol" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="guntype"
                value="Pistol"
                id="pistol"
                checked={gunType === "Pistol"}
                onChange={handleGunTypeChange}
              />
              <label htmlFor="pistol">HG</label>
            </li>
            <li
              className={`gun-radio ${gunType === "Extras" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="guntype"
                value="Extras"
                id="extras"
                checked={gunType === "Extras"}
                onChange={handleGunTypeChange}
              />
              <label htmlFor="extras">EXTRAS</label>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Code"
            className="border-2 rounded-2xl pl-2.5 mb-2.5"
            value={codeValue}
            onChange={(e) => setCodeValue(e.target.value)}
          />
          <button
            className="upload-button"
            onClick={handleUploadImage}
            disabled={
              !iconImage && (!attachImage || !gunName || !buildType || !gunType)
            }
          >
            upload
          </button>
        </div>
      </div>
    </section>
  );
};

export default UploadForm;
