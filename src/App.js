import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";  // Import the CSS file

const options = [
  { value: "numbers", label: "Numbers" },
  { value: "alphabets", label: "Alphabets" },
  { value: "highest_alphabet", label: "Highest Alphabet" },
];

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post("https://bajaj-backend-dbzp.onrender.com/api/v1/bfhl", {
        data: parsedData,
      });
      setResponseData(res.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON or API error");
    }
  };

  const filteredResponse = responseData
    ? Object.fromEntries(
        Object.entries(responseData).filter(([key]) =>
          selectedFilters.some((option) => option.value === key)
        )
      )
    : null;

  return (
    <div className="container">
      <h2>JSON Input</h2>
      <textarea
        rows="4"
        placeholder='["A", "B", "2", "5", "C", "10"]'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}

      {responseData && (
        <div className="result-container">
          <h3>Filter Results</h3>
          <Select
            isMulti
            options={options}
            onChange={setSelectedFilters}
            placeholder="Select fields to display"
          />
          <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
