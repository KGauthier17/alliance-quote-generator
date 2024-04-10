import React, { useState } from 'react';
import './QuoteGenerator.css';

const QuoteGenerator = () => {
  const [randomQuote, setRandomQuote] = useState('');
  const [typedQuote, setTypedQuote] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateRandomQuote = async () => {
    setIsButtonDisabled(true); // Disable the button when quote generation starts
    const url = 'https://quotes85.p.rapidapi.com/getrandomquote';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ac35d174fdmsh75e84e86f23587dp17b3f6jsn4253379c073a',
        'X-RapidAPI-Host': 'quotes85.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      setRandomQuote(result);

      setIsTyping(true);
      setTypedQuote('');
      for (let i = 0; i < result.length; i++) {
        setTimeout(() => {
          setTypedQuote((prev) => prev + result[i]);
          if (i === result.length - 1) {
            setIsButtonDisabled(false);
            setIsTyping(false);
          }
        }, i * 50);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      setIsButtonDisabled(false);
      setIsTyping(false);
    }
  };

  const copyToClipboard = () => {
    if (randomQuote && !isAnimating) {
      setIsAnimating(true);
      navigator.clipboard.writeText(randomQuote).then(function() {
        setTimeout(() => {
          setIsAnimating(false); // Animation ends here
        }, 3000);
        var copyButton = document.querySelector('.copy-button');
        copyButton.classList.add('clicked');
        setTimeout(function() {
          copyButton.classList.remove('clicked');
        }, 3000);
      }, function(err) {
        console.error('Could not copy text: ', err);
        setIsAnimating(false); // In case of error, also end the animation
      });
    }
  };

  return (
    <div className="quote-container">
      <div className="button-container">
        <button className="quote-button" onClick={generateRandomQuote} disabled={isButtonDisabled}>
          Get Random Quote
        </button>
        <button className="copy-button" onClick={copyToClipboard} disabled={!randomQuote || isTyping || isAnimating}>
          <i class="fas fa-clipboard"></i>
          <i class="fas fa-check"></i>
        </button>
      </div>
      {isTyping ? <p className="quote">{typedQuote}</p> : null}
      {randomQuote && !isTyping && (
        <div className="quote">
          <p>{randomQuote}</p>
        </div>
      )}
  </div>
  );
};

export default QuoteGenerator;