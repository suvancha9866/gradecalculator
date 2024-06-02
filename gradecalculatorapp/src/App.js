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

  const [subCategories, setSubCategories] = useState(() => {
    const savedSubCategories = localStorage.getItem('subCategories');
    return savedSubCategories ? JSON.parse(savedSubCategories) : categories.map(() => []);
  });

  const [subCategoriesVisibility, setSubCategoriesVisibility] = useState(() => {
    // Initialize visibility state for subcategories
    return categories.map(() => false);
  });

  useEffect(() => {
    localStorage.setItem('className', className);
  }, [className]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('subCategories', JSON.stringify(subCategories));
  }, [categories, subCategories]);

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
    setCategories([...categories, { name: '', grade: '', weight: '', subCategories: [] }]);
  };

  const removeLastCategory = () => {
    const newCategories = [...categories];
    newCategories.pop();  // Remove the last category
    setCategories(newCategories);
  };
  
  const addSubCategory = (categoryIndex) => {
    const newSubCategories = [...subCategories];
    newSubCategories[categoryIndex] = [...newSubCategories[categoryIndex], { name: '', grade: '', weight: '' }];
    setSubCategories(newSubCategories);
  };
  
  const removeLastSubCategory = (categoryIndex) => {
    const newSubCategories = [...subCategories];
    newSubCategories[categoryIndex].pop();
    setSubCategories(newSubCategories);
  };
  
  // Update the handleCategoryChange function to handle changes in subcategories
  const handleCategoryChange = (categoryIndex, field, value) => {
    const newCategories = [...categories];
    newCategories[categoryIndex][field] = value;
    setCategories(newCategories);
  };
  
  const handleSubCategoryChange = (categoryIndex, subCategoryIndex, field, value) => {
    const newSubCategories = [...subCategories];
    newSubCategories[categoryIndex][subCategoryIndex][field] = value;
    setSubCategories(newSubCategories);
  };

  const toggleSubCategoriesVisibility = (categoryIndex) => {
    const newVisibility = [...subCategoriesVisibility];
    if (!newVisibility[categoryIndex]) {
      // If subcategories are not visible yet and there are no existing subcategories, add a subcategory
      if (subCategories[categoryIndex].length === 0) {
        addSubCategory(categoryIndex);
      }
    }
    newVisibility[categoryIndex] = !newVisibility[categoryIndex];
    setSubCategoriesVisibility(newVisibility);
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

  const calculateCategoryGrade = (categoryIndex) => {
    const subCategories = categories[categoryIndex].subCategories;
    if (subCategories.length === 0) {
      return { grade: categories[categoryIndex].grade, weight: categories[categoryIndex].weight };
    }
    const totalWeight = subCategories.reduce((total, subCategory) => total + parseFloat(subCategory.weight || 0), 0);
    const totalGrade = subCategories.reduce((total, subCategory) => total + (parseFloat(subCategory.grade || 0) * parseFloat(subCategory.weight || 0)), 0);
    return { grade: totalWeight > 0 ? (totalGrade / totalWeight).toFixed(2) : 0, weight: totalWeight };
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
              <td className="FirstCells"><p className="InputHeader">{gradingType === 'percentage' ? 'Grade (%)' : 'Points'}</p></td>
              <td className="FirstCells"><p className="InputHeader">{gradingType === 'percentage' ? 'Weight' : 'Max Points'}</p></td>
              <td className="FirstCells"></td>
            </tr>
          </thead>
          <tbody>
          {categories.map((category, categoryIndex) => (
            <>
              <tr key={categoryIndex}>
                <td>
                  <input
                    className="CategoryInput"
                    type="text"
                    value={category.name}
                    onChange={(e) => handleCategoryChange(categoryIndex, 'name', e.target.value)}
                    spellCheck="false"
                  />
                </td>
                <td>
                  <input
                    className="Input"
                    type="number"
                    min="0"
                    step="any"
                    value={category.grade}
                    onChange={(e) => handleCategoryChange(categoryIndex, 'grade', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="Input"
                    type="number"
                    min="0"
                    step="any"
                    value={category.weight}
                    onChange={(e) => handleCategoryChange(categoryIndex, 'weight', e.target.value)}
                  />
                </td>
                <td>
                  <button className="DownButton" onClick={() => toggleSubCategoriesVisibility(categoryIndex)}>
                    {subCategoriesVisibility[categoryIndex] ? 'Collapse' : 'Open'}
                  </button>
                </td>
              </tr>
              {subCategoriesVisibility[categoryIndex] && subCategories[categoryIndex].map((subCategory, subCategoryIndex) => (
                <tr key={`${categoryIndex}-${subCategoryIndex}`}>
                  <td>
                    <input
                      className="AssignmentInput"
                      type="text"
                      value={subCategory.name}
                      onChange={(e) => handleSubCategoryChange(categoryIndex, subCategoryIndex, 'name', e.target.value)}
                      spellCheck="false"
                    />
                  </td>
                  <td>
                    <input
                      className="SubInput"
                      type="number"
                      min="0"
                      step="any"
                      value={subCategory.grade}
                      onChange={(e) => handleSubCategoryChange(categoryIndex, subCategoryIndex, 'grade', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      className="SubInput"
                      type="number"
                      min="0"
                      step="any"
                      value={subCategory.weight}
                      onChange={(e) => handleSubCategoryChange(categoryIndex, subCategoryIndex, 'weight', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
                {subCategoriesVisibility[categoryIndex] && (
                  <tr key={`buttons-${categoryIndex}`}>
                    <td></td>
                    <td colSpan="4">
                      <button className="ButtonSub" onClick={() => addSubCategory(categoryIndex)}>Add Assignment</button>
                      <button className="ButtonSub" onClick={() => removeLastSubCategory(categoryIndex)}>Remove Assignment</button>
                    </td>
                  </tr>
                )}
            </>
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