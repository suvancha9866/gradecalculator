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
    setSubCategories([...subCategories, []]);
    setSubCategoriesVisibility([...subCategoriesVisibility, false]);
  };

  const removeLastCategory = () => {
    const newCategories = [...categories];
    const newSubCategories = [...subCategories];
    const newVisibility = [...subCategoriesVisibility];
    newCategories.pop();
    newSubCategories.pop();
    newVisibility.pop();
    setCategories(newCategories);
    setSubCategories(newSubCategories);
    setSubCategoriesVisibility(newVisibility);
  };
  
  const addSubCategory = (categoryIndex) => {
    const newSubCategories = [...subCategories];
    newSubCategories[categoryIndex] = [...newSubCategories[categoryIndex], { name: '', grade: '', weight: '' }];
    setSubCategories(newSubCategories);
    updateCategoryTotals(categoryIndex, newSubCategories[categoryIndex]);
  };
  
  const removeLastSubCategory = (categoryIndex) => {
    const newSubCategories = [...subCategories];
    newSubCategories[categoryIndex].pop();
    setSubCategories(newSubCategories);
    updateCategoryTotals(categoryIndex, newSubCategories[categoryIndex]);
  };
  
  const handleCategoryChange = (categoryIndex, field, value) => {
    const newCategories = [...categories];
    newCategories[categoryIndex][field] = value;
    setCategories(newCategories);
  };
  
  const handleSubCategoryChange = (categoryIndex, subCategoryIndex, field, value) => {
    const newSubCategories = [...subCategories];
    newSubCategories[categoryIndex][subCategoryIndex][field] = value;
    setSubCategories(newSubCategories);
    updateCategoryTotals(categoryIndex, newSubCategories[categoryIndex]);
  };

  const updateCategoryTotals = (categoryIndex, subCategoryList) => {
    const totalWeight = subCategoryList.reduce((total, subCategory) => total + parseFloat(subCategory.weight || 0), 0);
    const totalGrade = subCategoryList.reduce((total, subCategory) => total + parseFloat(subCategory.grade || 0), 0);
    const newCategories = [...categories];
    newCategories[categoryIndex].weight = totalWeight.toFixed(0);
    newCategories[categoryIndex].grade = totalGrade.toFixed(0);
    setCategories(newCategories);
  };

  const toggleSubCategoriesVisibility = (categoryIndex) => {
    const newVisibility = [...subCategoriesVisibility];
    if (!newVisibility[categoryIndex]) {
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

  const isCategoryReadOnly = (categoryIndex) => {
    return subCategories[categoryIndex].length > 0;
  };

  const greenThreshold = 93;
  const yellowThreshold = 90;

  const determineColor = () => {
    if (calculateGrade() <= yellowThreshold) {
      return 'red';
    } else if (calculateGrade() <= greenThreshold) {
      return '#8B8000';
    } else {
      return 'green';
    }
  };

  return (
    <div className="Environment">
      <div className="Header">
        <h1 className="Title">Grade Calculator for Multiple Classes</h1>
        <p className="SubTitle">By: Suvan Chatakondu. Inspired by <a href="https://www.rapidtables.com/calc/grade/grade-calculator.html" target="_blank" rel="noreferrer">Rapid Tables</a></p>
      </div>
      <div className="Duplicating">
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
                    placeholder={` ${
                        categoryIndex === 0
                          ? "e.g. Homework"
                          : categoryIndex === 1
                          ? "e.g. Quizzes"
                          : categoryIndex === 2
                          ? "e.g. Exams"
                          : categoryIndex === 3
                          ? "e.g. Final"
                          : ""
                      }`}
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
                    readOnly={isCategoryReadOnly(categoryIndex)}
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
                    readOnly={isCategoryReadOnly(categoryIndex)}
                  />
                </td>
                <td>
                  <button className="DownButton" onClick={() => toggleSubCategoriesVisibility(categoryIndex)}>
                    {subCategoriesVisibility[categoryIndex] ? '▲' : '▼'}
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
        <p className="InputHeader" style={{ color: determineColor() }}>Overall Grade: {calculateGrade()}%</p>
      </div>
      </div>
      <div className="EditClassAmount">
        <button className="Button">Add Class</button>
        <button className="Button">Remove Class</button>
      </div>
    </div>
    
  );
}

export default App;
