import "./styles.css"


function App() {
  return (
    <div className="Environment">
      {/*Functions to Implement: 1) Make the Class editable and Change Font from Editable to Normal, 2)Increase the Number using the side arrows for the Grade and Weightage input boxes, 3)Drop down Needs to open up more input boxes */}
      <div className="Header">
        <h1 className="Title">Grade Calculator for Multiple Classes</h1>
        <p className="SubTitle">Inspired by <a href="https://www.rapidtables.com/calc/grade/grade-calculator.html" target="_blank" rel="noreferrer">Rapid Tables</a></p>
        <p className="SubTitle">By: Suvan Chatakondu</p>
      </div>
      <div className="InputClass">
        <input type="text" placeholder="Class 1" spellcheck="false"></input>
        {/*Need to make a function for this so it goes back and for from editable and normal text*/}
      </div>
      <div className="InputSection">
        <table>
          <tr>
            {/*Need to align alll of this headers tot he top of the cell */}
            <td>
              <h3 className="InputHeader1">Category Name</h3>
              <p className="InputHeader1Subtitle">Use the Drop Down to Add Detail (Optional)</p>
              {/*Find a way to wrap text*/}
            </td>
            <td></td>
            <td><h3 className="InputHeader2">Grade (%)</h3></td>
            <td><h3 className="InputHeader3">Weight</h3></td>
          </tr>
          <tr>
            <td><input className="CategoryInput" type="text" spellcheck="false"></input></td>
            <td><button><img src="./down.png" alt="Down" width="500" height="600"></img></button></td>
            <td><input className="GradeInput" type="number" value min="0" step="any"></input></td>
            <td><input className="WeightageInput" type="number" value min="0" step="any"></input></td>
            {/*Needs a function for increase the number by 1*/}
          </tr>
        </table>
        <button className="AddCategory">Add Category</button>
      </div>
      <div className="EditClassAmount">
        <button className="ButtonStatic">Add Class</button>
        <button className="ButtonDynamic">Remove Class</button>
      </div>
    </div>
    
  );
}

export default App;
