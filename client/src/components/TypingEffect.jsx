import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed = 30, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className="whitespace-pre-wrap">
      {displayText}
      {currentIndex < text.length && (
        <span className="cursor-blink">▋</span>
      )}
    </span>
  );
};

export default TypingEffect;