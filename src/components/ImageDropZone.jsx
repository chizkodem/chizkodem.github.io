import React from "react";

const ImageDropZone = ({
  setAttachImage,
  setIconImage,
  iconImage,
  attachImage,
}) => {
  const handleAttachImageChange = (e) => {
    setAttachImage(e.target.files[0]);
  };

  const handleIconImageChange = (e) => {
    setIconImage(e.target.files[0]);
  };
  const handleDrop = (e, type) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }
    if (type === "attach") {
      setAttachImage(file);
    }
    if (type === "icon") {
      setIconImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handlePaste = (e, type) => {
    const items = e.clipboardData.items;

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();

        if (type === "attach") {
          setAttachImage(file);
        }
      }
    }
    console.log("pasted");
  };

  return (
    <div className="grid-cols-2 grid  gap-1 h-30 text-white">
      <div
        className="gun-attach-img-container flex flex-col items-center text-center p-2"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "attach")}
        onPaste={(e) => handlePaste(e, "attach")}
        tabIndex={0}
      >
        <p>attachment img</p>
        <input
          type="file"
          accept="image/*"
          className="border rounded-lg w-50 cursor-pointer"
          onChange={handleAttachImageChange}
        />
        {attachImage ? (
          <p>{attachImage.name}</p>
        ) : (
          <p>Drag and Drop your attachment file here</p>
        )}
      </div>
      <div
        className="gun-icon-img-container flex flex-col items-center text-center p-2"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "icon")}
      >
        <p>Icon img</p>
        <input
          type="file"
          accept="image/*"
          className="border rounded-lg w-50 cursor-pointer"
          onChange={handleIconImageChange}
        />
        {iconImage ? (
          <p>{iconImage.name}</p>
        ) : (
          <p>Drag and Drop your icon file here</p>
        )}
      </div>
    </div>
  );
};

export default ImageDropZone;
