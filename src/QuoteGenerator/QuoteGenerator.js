import React, { useState } from 'react';
import './QuoteGenerator.css';

const QuoteGenerator = () => {
  const [randomQuote, setRandomQuote] = useState('');
  const [typedQuote, setTypedQuote] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateRandomQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      const fullQuote = `${data.content} ~ ${data.author}`;
      setRandomQuote(fullQuote);

      
      setIsTyping(true);
      setTypedQuote('');
      for (let i = 0; i < fullQuote.length; i++) {
        setTimeout(() => {
          setTypedQuote((prev) => prev + fullQuote[i]);
        }, i * 50);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  return (
    <div className="quote-container">
      <button className="quote-button" onClick={generateRandomQuote}>
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
