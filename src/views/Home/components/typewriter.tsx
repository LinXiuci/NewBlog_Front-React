import React, { useState, useEffect, useMemo } from "react";

interface TypewriterProps {
  text: string;
  delay: number;
}
/**
 * 组件-打字机
 *  */
const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 500 }) => {
  const [textToShow, setTextToShow] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setTextToShow((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setTextToShow("");
        setCurrentIndex(0);
      }
    }, delay);
    return () => clearInterval(intervalId);
  }, [text, delay, currentIndex]);

  const memoizedP = useMemo(() => <p>{textToShow}</p>, [textToShow]);

  return <>{memoizedP}</>;
};

export default Typewriter;
