import React, { useState } from 'react';
import './QuoteGenerator.css';

const QuoteGenerator = () => {
  const [randomQuote, setRandomQuote] = useState('');
  const [typedQuote, setTypedQuote] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state variable

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
      console.log(result)
      setRandomQuote(result);

      setIsTyping(true);
      setTypedQuote('');
      for (let i = 0; i < result.length; i++) {
        setTimeout(() => {
          setTypedQuote((prev) => prev + result[i]);
          if (i === result.length - 1) {
            setIsButtonDisabled(false); // Enable the button when quote has been fully typed out
          }
        }, i * 50);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      setIsButtonDisabled(false); // Enable the button in case of error
    }
  };

  return (
    <div className="quote-container">
      <button className="quote-button" onClick={generateRandomQuote} disabled={isButtonDisabled}>
        Get Random Quote
      </button>
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