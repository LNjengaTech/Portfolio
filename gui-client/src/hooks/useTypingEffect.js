// src/hooks/useTypingEffect.js

import { useState, useEffect, useCallback } from 'react';

const useTypingEffect = (texts, speed = 500, pause = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(speed);

  const currentText = texts[textIndex];
  
  // Use useCallback to memoize the logic function
  const handleTyping = useCallback(() => {
    // Determine the text to display
    const textToDisplay = currentText.substring(0, charIndex);
    setDisplayText(textToDisplay);

    // --- Typing Logic ---
    if (!isDeleting && charIndex < currentText.length) {
      // Typing forward
      setCharIndex(prev => prev + 1);
      setCurrentSpeed(speed);
    } else if (isDeleting && charIndex > 0) {
      // Deleting backward
      setCharIndex(prev => prev - 1);
      setCurrentSpeed(speed / 2); // Faster deletion
    } else if (charIndex === currentText.length && !isDeleting) {
      // Finished typing current word, now pause
      setCurrentSpeed(pause);
      setTimeout(() => setIsDeleting(true), pause);
    } else if (charIndex === 0 && isDeleting) {
      // Finished deleting, move to the next word
      setIsDeleting(false);
      setTextIndex(prev => (prev + 1) % texts.length);
      setCurrentSpeed(speed);
    }
  }, [currentText, charIndex, isDeleting, speed, pause, texts.length]);


  useEffect(() => {
    // Set up the interval for the typing effect
    const timer = setTimeout(handleTyping, currentSpeed);

    // Cleanup the timer when component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, [handleTyping, currentSpeed]);

  return displayText;
};

export default useTypingEffect;