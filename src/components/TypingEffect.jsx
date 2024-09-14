import React, {useState, useEffect} from "react";

const TypingEffect = ({text, speed}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearInterval(timer);
    }
  }, [index, text, speed]);

  return <p>{displayedText}</p>;
};

export default TypingEffect;
