import "./styles.css"


function App() {
  return (
    <div className="Environment">
      {/*Functions to Implement: 1) Make the Class editable and Change Font from Editable to Normal, 2)Drop down Needs to open up more input boxes, 3) The buttons should lose their hover after a couple of seconds*/}
      <div className="Header">
        <h1 className="Title">Grade Calculator for Multiple Classes</h1>
        <p className="SubTitle">By: Suvan Chatakondu. Inspired by <a href="https://www.rapidtables.com/calc/grade/grade-calculator.html" target="_blank" rel="noreferrer">Rapid Tables</a></p>
      </div>
      <div className="InputClass">
        <input className="InputForClass" type="text" placeholder="Class 1" spellcheck="false"></input>
        {/*Need to make a function for this so it goes back and for from editable and normal text*/}
      </div>
      <div className="InputSection">
        <div className="GradingType">
          {/*Credit for this div goes to Rapid Tables*/}
          <label for="gradetype1" className="btn">
            <input type="radio" name="gradetype[]" value="0" id="gradetype1" checked></input>Percentage
          </label>
          <label for="gradetype2" className="btn">
            <input type="radio" name="gradetype[]" value="1" id="gradetype2"></input>Points
          </label>
        </div>
        <table className="Table">
          <tr>
            <td className="FirstCells">
              <p className="InputHeader">Category Name</p>
              <p className="InputHeader1Subtitle">Use Down Arrow to Add Specific Assignments (Optional)</p>
            </td>
            <td className="FirstCells"></td>
            <td className="FirstCells"><p className="InputHeader">Grade (%)</p></td>
            <td className="FirstCells"><p className="InputHeader">Weight</p></td>
          </tr>
          <tr>
            <td><input className="CategoryInput" type="text" spellcheck="false"></input></td>
            <td><button className="DownButton"><img src="images/line-angle-down-icon.png" alt="Down"></img></button></td>
            <td><input className="Input" type="number" min="0" step="any"></input></td>
            <td><input className="Input" type="number" min="0" step="any"></input></td>
          </tr>
        </table>
        <button className="Button">Add Category</button>
      </div>
      <div className="GradeBox">
        {/*Need to Implement still*/}
      </div>
      <div className="EditClassAmount">
        <button className="Button">Add Class</button>
        <button className="Button">Remove Class</button>
      </div>
    </div>
    
  );
}

export default App;
