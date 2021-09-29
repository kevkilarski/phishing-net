import './App.css';

function App() {
  return (
    <>
      <header>
        <div className="wrapper">
          <h1>Phishing Net</h1>
        </div>
      </header>
      <section className="input">
        <div className="wrapper">
          <form>
            <label>
            <input type="text"></input>
            </label>
          </form>
          <button>Submit URL</button>
        </div>
      </section>
    </>
  );
}

export default App;













// --Pseudocode--

// Create landing Page that contains
// - the header (title)
// - text form submit button

// Create Components
// - input (enter url)
// - output
//     - clean message
//     - suspicious message

// Mount Components

// Create State items to hold data for render
// - user input
// - PhishStats API

// Add Event for 'submit' button, to pass infomation to userInput component

// Add useEffect for condition for determining if clean or suspicious message will appear

// Add props to Components
// - cleanMessage
//     - Condition for appearing or not
//     - API json properties (Country of Origin, Times Identified as Phishing)
// - suspiciousMessage
//     - Condition for appearing or not
//     - API json properties (Country of Origin, Times Identified as Phishing)

// Render: Upon button press, send API information to useEffect
// - pass API information to and render clean or suspicious component

