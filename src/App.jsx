import "./App.css";
import {useEffect, useState} from "react";
import Home from "./components/Home.jsx";
import Header from "./components/Header.jsx";
import Weapons from "./components/Weapons.jsx";
import Lightbox, {functionTest} from "./components/Lightbox.jsx";

const weaponListAr = {
  list: [
    "Peacekeeper",
    "EM2",
    "HVK-30",
    "KN-44",
    "BP-50",
    "AK-47",
    "AK-117",
    "ICR-1",
    "ASM-10",
    "MADDOX",
    "BK-57",
    "DR-H",
    "FFAR",
    "FR-556",
    "GRAU 5.56",
    "HBRa3",
    "KILO 141",
    "KRIG 6",
    "LAG 53",
    "LK-24",
    "M4",
    "M13",
    "M16",
    "MAN-O-WAR",
    "ODEN",
    "TYPE-25",
  ],
  type: "AR",
  split: true,
};

const weaponListSmg = {
  list: [
    "AGR 556",
    "CBR4",
    "CHICOM",
    "CORDITE",
    "CX9",
    "FENNEC",
    "GKS",
    "HG 40",
    "ISO",
    "KSP",
    "LAPA",
    "MAC 10",
    "MSMC",
    "MX-9",
    "OTS 9",
    "PDW57",
    "PP19-BIZON",
    "PPSH-41",
    "QQ9",
    "QXR",
    "RAZORBACK",
    "RUS-79U",
    "STRIKER 45",
    "SWITCHBLADE",
  ],
  type: "SMG",
  split: true,
};

const weaponListSG = {
  list: ["KRM", "ARGUS", "STRIKER"],
  type: "SG",
  split: false,
};

const weaponListMM = {
  list: ["KILO BOLT", "MK2", "SKS", "SP-R"],
  type: "MM",
  split: false,
};

const weaponListSR = {
  list: ["DL Q33", "LOCUS", "LW3-TUNDRA"],
  type: "SR",
  split: false,
};

const weaponListLMG = {
  list: [
    "CHOPPER",
    "DINGO",
    "HADES",
    "HOLGER 26",
    "MG42",
    "PKM",
    "S36",
    "UL736",
  ],
  type: "LMG",
  split: false,
};

const weaponListHG = {
  list: ["50 GS", "DOBVRA", "J358", "L-CAR 9", "MACHINE PISTOL", "SHORTY"],
  type: "HG",
  split: false,
};

const EXTRAS = {
  list: ["SENSI", "PERK"],
  type: "EXTRAS",
  split: false,
};

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    // Clean up the observer on component unmount
    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []); // Add dependency array to run only on mount/unmount

  const [lightboxImage, setLightboxImage] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [revealLightbox, setTevealLightbox] = useState(false);

  const openLightbox = (gunName, attachSrc) => {
    const imageVariations = [
      `${attachSrc}${gunName}.jpg`,
      `${attachSrc}${gunName} smg-type.jpg`,
      `${attachSrc}${gunName} red-dot-type.jpg`,
      `${attachSrc}${gunName} burst-type.jpg`,
      `${attachSrc}${gunName} ar-type.jpg`,
      `${attachSrc}${gunName} pin-point.jpg`,
      `${attachSrc}${gunName} gyro.jpg`,
      `${attachSrc}${gunName} sniper.jpg`,
    ];
    functionTest(imageVariations);
    document.addEventListener("click", (event) => {
      const lightBoxCon = document.getElementById("lightbox");
      const loadingCover = document.getElementById("lightbox-cover");

      if (
        !event.target.id.includes("img") ||
        (!event.target.id.includes("img-icon") &&
          !event.target.id.includes("img-btn"))
      ) {
        if (lightBoxCon) {
          loadingCover.classList.remove("show");
          setIsLightboxOpen(false);
        }
      }
    });
    setImgSrc(attachSrc);
    setLightboxImage(gunName);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div
        className={`lightbox-cover ${revealLightbox ? "show" : ""}`}
        id="lightbox-cover"
      ></div>
      <Lightbox
        gunName={lightboxImage}
        attachSrc={imgSrc}
        isOpen={isLightboxOpen}
      />
      <Header onToggleLightbox={setTevealLightbox} />

      <main className="main">
        <Home />
        <Weapons gunList={weaponListAr} openLightbox={openLightbox} />
        <Weapons gunList={weaponListSmg} openLightbox={openLightbox} />
        <Weapons gunList={weaponListSG} openLightbox={openLightbox} />
        <Weapons gunList={weaponListMM} openLightbox={openLightbox} />
        <Weapons gunList={weaponListSR} openLightbox={openLightbox} />
        <Weapons gunList={weaponListLMG} openLightbox={openLightbox} />
        <Weapons gunList={weaponListHG} openLightbox={openLightbox} />
        <Weapons gunList={EXTRAS} openLightbox={openLightbox} />
      </main>
    </>
  );
}

export default App;
