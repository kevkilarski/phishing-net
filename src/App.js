// importing additional features
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

// importing components
import Output from './Output.js';
import Clean from './Clean.js';
import Flagged from './Flagged.js';

function App() {

  // Utilizing useEffect Hook for API call, to render when necessary
  useEffect( () => {
    axios({
      method: 'GET',
      url: 'https://phishstats.info:2096/api/phishing',
      dataResponse: 'json',
      params: {
        _where: '(url,eq,https://applecloud-ma.com/)',
        _sort: '-id'
      }
    }).then( (response) => {
      console.log("API RESPONSE", response);
      // Setting the state to the flagged or an empty string if unflagged
      response.data.length === 0 ? setUrl('') : setUrl([response.data[0].url, response.data[0].city]);
    });
  }, []);


  // Utilizing useState Hook to store data from each API call, to be used a a prop
  const [url, setUrl] = useState('');


  //

  return (
    // Using a fractional to add multiple unrelated elements
    <>

      <header>
        <div className="wrapper">
          <h1>Phishing Net</h1>
        </div>
      </header>

      <section className="input">
        <div className="wrapper">
          <form action="#" method="#" className="formUrl" name="formUrl">
            <label htmlFor="searchUrl"></label>
            <input type="text" id="searchUrl" name="searchUrl" className="searchUrl" placeholder="Example: apple.com"></input>
            <button>Submit URL</button>
          </form>
        </div>
      </section>

      <Output>
        {
          url ? <Flagged urlAddress={url[0]} city={url[1]}/> : <Clean urlAddress={url} />
        }
      </Output>

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

