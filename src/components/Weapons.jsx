import React from "react";
import {useEffect, useRef} from "react";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const soloClass = (type) => {
  if (type !== "AR" && type !== "SMG") {
    return "solo";
  }
};

const getTitle = (type) => {
  if (type === "AR") {
    return <h2>Assault Rifles</h2>;
  }
  if (type === "SMG") {
    return <h2>Submachine Gun</h2>;
  }
  if (type === "SG") {
    return <h2>Shotgun</h2>;
  }
  if (type === "MM") {
    return <h2>Marksman</h2>;
  }
  if (type === "SR") {
    return <h2>Sniper Rifles</h2>;
  }
  if (type === "LMG") {
    return <h2>Light Machine Guns</h2>;
  }
  if (type === "HG") {
    return <h2>Secondary</h2>;
  }
  if (type === "EXTRAS") {
    return <h2>Extras</h2>;
  }
};

function useEffectInstant() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // console.log(entry);
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
  }, []);
}

const flexDirection = (type, split) => {
  const conName = document.getElementById(`${type}-icons`);

  if (conName) {
    conName.style.flexDirection = split ? "row" : "column";
  }
};

const highLight = (highLight) => {
  const navbarHighlight = document.querySelectorAll(".highLight");

  const clearCLasses = () => {
    navbarHighlight.forEach((highLight) => {
      highLight.classList.remove("active");
    });
  };

  setTimeout(() => {
    clearCLasses();
    if (highLight === "Assault Rifles") {
      navbarHighlight[0].classList.add("active");
    } else if (highLight === "Submachine Gun") {
      navbarHighlight[1].classList.add("active");
    } else if (highLight === "Shotgun") {
      navbarHighlight[2].classList.add("active");
    } else if (highLight === "Marksman") {
      navbarHighlight[3].classList.add("active");
    } else if (highLight === "Sniper Rifles") {
      navbarHighlight[4].classList.add("active");
    } else if (highLight === "Light Machine Guns") {
      navbarHighlight[5].classList.add("active");
    } else if (highLight === "Secondary") {
      navbarHighlight[6].classList.add("active");
    } else if (highLight === "Extras") {
      navbarHighlight[7].classList.add("active");
    }
  }, 500);

  // console.log(highLight);
};

const Weapons = ({gunList, openLightbox}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          if (sectionElement.classList.contains("show")) {
            // Call your function here
            // console.log(mutation.target.children[0].children[0].innerText);

            // console.log("The section is now visible");
            highLight(mutation.target.children[0].children[0].innerText);
          } else {
            // highLight(mutation);
          }
        }
      });
    });

    observer.observe(sectionElement, {
      attributes: true, // Observe attribute changes
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const imgIconSrc = `img/${gunList.type} icons/`;
  const imgAttachSrc = `attach/${gunList.type} attach/`;
  useEffectInstant();
  const chunkSize = 4;

  const chunks = gunList.split
    ? chunkArray(gunList.list, chunkSize)
    : [gunList.list];

  if (!gunList.split) {
    flexDirection(gunList.type, gunList.split);
  } else {
    flexDirection(gunList.type, gunList.split);
  }

  return (
    <>
      <section
        className={`${gunList.type} hidden`}
        id={`${gunList.type}`}
        ref={sectionRef}
      >
        <div className="attach">
          {getTitle(gunList.type)}
          {chunks.map((chunk, index) => (
            <div
              className={`icons-container hidden`}
              key={index}
              id={`${gunList.type}-icons`}
            >
              {chunk.map((rifle) => (
                <div className={`icon hidden `} key={rifle}>
                  <div
                    className={`img-container ${
                      rifle === "Peacekeeper" ? "Peacekeeper" : ""
                    }`}
                    id="img-container"
                  >
                    <img
                      className={soloClass(gunList.type)}
                      src={imgIconSrc + rifle + ".jpg"}
                      alt={rifle}
                      id="img-icon"
                      onClick={() => {
                        openLightbox(rifle, imgAttachSrc);
                      }}
                    />
                    <span>{rifle}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Weapons;
