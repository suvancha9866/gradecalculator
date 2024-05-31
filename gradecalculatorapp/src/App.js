import "./styles.css"
import React, { useState, useEffect } from 'react';


function App() {
  const [className, setClassName] = useState(() => {
    return localStorage.getItem('className') || '';
  });

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  const [gradingType, setGradingType] = useState(() => {
    return localStorage.getItem('gradingType') || 'percentage';
  });

  useEffect(() => {
    localStorage.setItem('className', className);
  }, [className]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('gradingType', gradingType);
  }, [gradingType]);

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const handleGradingTypeChange = (event) => {
    setGradingType(event.target.value);
  };

  const addCategory = () => {
    setCategories([...categories, { name: '', grade: '', weight: '' }]);
  };

  const removeLastCategory = () => {
    const newCategories = [...categories];
    newCategories.pop();  // Remove the last category
    setCategories(newCategories);
  };

  const handleCategoryChange = (index, field, value) => {
    const newCategories = [...categories];
    newCategories[index][field] = value;
    setCategories(newCategories);
  };

  const calculateGrade = () => {
    if (gradingType === 'percentage') {
      const totalWeight = categories.reduce((total, category) => total + parseFloat(category.weight || 0), 0);
      const totalGrade = categories.reduce((total, category) => total + (parseFloat(category.grade || 0) * parseFloat(category.weight || 0)), 0);
      return totalWeight > 0 ? (totalGrade / totalWeight).toFixed(2) : 0;
    } else {
      const totalGrade = categories.reduce((total, category) => total + parseFloat(category.grade || 0), 0);
      const totalWeight = categories.reduce((total, category) => total + parseFloat(category.weight || 0), 0);
      return totalWeight > 0 ? ((totalGrade / totalWeight) * 100).toFixed(2) : 0;
    }
  };
  

  return (
    <div className="Environment">
      {/*Functions to Implement: 1)Drop down Needs to open up more input boxes, 2) The buttons should lose their hover after a couple of seconds*/}
      <div className="Header">
        <h1 className="Title">Grade Calculator for Multiple Classes</h1>
        <p className="SubTitle">By: Suvan Chatakondu. Inspired by <a href="https://www.rapidtables.com/calc/grade/grade-calculator.html" target="_blank" rel="noreferrer">Rapid Tables</a></p>
      </div>
      <div className="InputClass">
        <input className="InputForClass" type="text" placeholder="Class Name" value={className} onChange={handleClassNameChange} spellcheck="false"></input>
        {/*Need to make a function for this so it goes back and for from editable and normal text*/}
      </div>
      <div className="InputSection">
        <div className="GradingType">
          {/*Credit for this div goes to Rapid Tables*/}
          <label for="gradetype1" className="btn">
            <input type="radio" name="gradetype[]" value="percentage" id="gradetype1" checked={gradingType === 'percentage'} onChange={handleGradingTypeChange}></input>Percentage
          </label>
          <label for="gradetype2" className="btn">
            <input type="radio" name="gradetype[]" value="points" id="gradetype2" checked={gradingType === 'points'} onChange={handleGradingTypeChange}></input>Points
          </label>
        </div>
        <table className="Table">
          <thead>
            <tr>
              <td className="FirstCells">
                <p className="InputHeader">Category Name</p>
                <p className="InputHeader1Subtitle">Use Down Arrow to Add Specific Assignments (Optional)</p>
              </td>
              <td className="FirstCells"></td>
              <td className="FirstCells"><p className="InputHeader">{gradingType === 'percentage' ? 'Grade (%)' : 'Points'}</p></td>
              <td className="FirstCells"><p className="InputHeader">{gradingType === 'percentage' ? 'Weight' : 'Max Points'}</p></td>
            </tr>
          </thead>
          <tbody>
          {categories.map((category, index) => (
              <tr key={index}>
                <td><input
                  className="CategoryInput"
                  type="text"
                  value={category.name}
                  onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                  spellCheck="false"
                /></td>
                <td>
                  <button className="DownButton">
                    <img src="images/line-angle-down-icon.png" alt="Down" />
                  </button>
                </td>
                <td>
                  <input
                    className="Input"
                    type="number"
                    min="0"
                    step="any"
                    value={category.grade}
                    onChange={(e) => handleCategoryChange(index, 'grade', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="Input"
                    type="number"
                    min="0"
                    step="any"
                    value={category.weight}
                    onChange={(e) => handleCategoryChange(index, 'weight', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="Button" onClick={addCategory}>Add Category</button>
        <button className="Button" onClick={removeLastCategory}>Remove Category</button>
        <p className="InputHeader">Grade In Class:</p>
        <input className="Input2" type="number" readOnly={true} value={calculateGrade()}></input>
      </div>
      <div className="EditClassAmount">
        <button className="Button">Add Class</button>
        <button className="Button">Remove Class</button>
      </div>
    </div>
    
  );
}

export default App;
