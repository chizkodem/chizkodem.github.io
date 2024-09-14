import {useEffect, useState} from "react";
import Typed from "typed.js";
import TypingEffect from "./TypingEffect";

const Home = () => {
  const text = `This is what I've been working on for the past few days. I made
              this for you so you can get any of my favorite attachments. This
              is not finished yet, I'll update this once in a while. So if you
              find an error or a mistake like the gun's name or an image not
              showing, feel free to message me. the links are down below,
              thanks!`;

  useEffect(() => {
    const options = {
      strings: ["Content Creator", "Tiktoker", "Gamer", "Programmer"],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    };

    const typed = new Typed(".multi-text", options);

    return () => {
      // Destroy the Typed instance when the component unmounts
      typed.destroy();
    };
  }, []);

  return (
    <section className="home" id="HOME">
      <div class="home-content">
        <div class="home-container">
          <h1>
            Hi, I'm <span>Chiz</span> Kodem
          </h1>
          <div class="wrapper">
            <h3>
              I'm a <span class="multi-text">Content Creator</span>
              <span
                class="typed-cursor typed-cursor--blink"
                aria-hidden="true"
              ></span>
            </h3>
          </div>
          <div class="hero-para">
            <TypingEffect text={text} speed={2} />
          </div>
          <div class="btn-box">
            <a
              href="https://discord.gg/DcdT8DZfsD"
              target="_blank"
              id="home-left-btn"
            >
              Join DC
            </a>
            <a
              href="https://www.facebook.com/jozephjrperez"
              target="_blank"
              id="home-right-btn"
            >
              Add me
            </a>
          </div>
        </div>

        <div class="home-vid">
          <iframe
            src="https://www.youtube.com/embed/TggiMHqrD5Y?autoplay=1&mute=1&loop=1&playlist=TggiMHqrD5Y&controls=0"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Home;
