import { useState } from "react";

function AIAssistant() {

  const [query, setQuery] = useState("");

  const suggestions = [
    "Vegetarian protein powder under ₹2000",
    "A thoughtful birthday gift under ₹1500",
    "Something for my home office",
  ];

  return (
    <div className="assistant-preview">

      <div className="assistant-header">

        <div>
          <p>SHOPAI ASSISTANT</p>
          <h3>What are you looking for?</h3>
        </div>

        <span className="status-dot"></span>

      </div>


      <div className="assistant-message">
        I can help you find products based on your
        budget, preferences, dietary needs and more.
      </div>


      <div className="assistant-input">

        <input
          type="text"
          placeholder="Tell me what you need..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

      </div>


      <div className="suggestion-list">

        {suggestions.map((suggestion) => (

          <button
            key={suggestion}
            className="suggestion"
            onClick={() => setQuery(suggestion)}
          >
            {suggestion}
          </button>

        ))}

      </div>


      <button className="assistant-button">
        Find Products
      </button>

    </div>
  );
}

export default AIAssistant;