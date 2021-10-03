// importing additional features
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

// importing components
import LoadingMessage from './LoadingMessage.js';
import Output from './Output.js';
import Clean from './Clean.js';
import Flagged from './Flagged.js';


const App = () => {

  // useState Hooks
    // Storing object from each API call
    const [url, setUrl] = useState({});

    // Storing values of text input
    const [userText, setUserText] = useState("");
    
    // Storing finalized text input for submission
    const [submit, setSubmit] = useState();

    // Storing toggle for submission event (used for error handling, otherwise a duplicate text input submission would not trigger useEffect)
    const [submitToggle, setSubmitToggle] = useState(0);

    // Storing toggle for flagged urls for phishing scams
    const [flaggedToggle, setFlaggedToggle] = useState('');

    // Storing toggle for whether a blank text input was provided to proceed with form submission
    const [needText, setNeedText] = useState(false);

    // Storing toggle for whether a url-like text input was provided to proceed with form submission
    const [needUrl, setNeedUrl] = useState(false);

     // Storing toggle for loading notification
    const [isLoading, setLoading] = useState(false);


  // Function to set userText state with user input
  const handleChange = (event) => {
    setUserText(event.target.value);
  }


  // Function to set userSubmit with userText, triggering api call
  const handleSubmit = (event) => {
    event.preventDefault();

    // Parsing beginning of user text to determine if a full url is provided
    const urlCheck = userText.substr(0,4);

    // Conditional logic to either require an http prefix, require entering any text, or submit the user text
    if (userText && urlCheck !== "http") {
      setNeedUrl(true);
      setNeedText(false);
      setLoading(false);
      setUserText("");
    } else if (!userText) {
      setNeedUrl(false);
      setNeedText(true);
      setLoading(false);
    } else {
      setNeedUrl(false);
      setNeedText(false);
      setLoading(true);
      setSubmitToggle(1);
      setSubmit(userText);
    }
  }

  // useEffect Hook for API call
  useEffect( () => {

    // Conditional logic to call api only when form submission occurs, not on page load
    if (submitToggle === 1) {
      
      axios({
        method: 'GET',
        url: 'https://phishstats.info:2096/api/phishing',
        dataResponse: 'json',
        params: {
          _where: `(url,eq,${submit})`,
          _sort: '-id'
        }
      }).then( (response) => {
        console.log("API RESPONSE", response);
        console.log("USER TEXT", userText);
        console.log("API RESPONSE FOR STATE", response.data[0]);
        console.log("SUBMIT", submit);

        // This timeout was added only to demonstrate a 'loading' feature for the api that I worked on.  It would be removed for production build.
        setTimeout(() => {

          // Conditional logic to render a clean address if no results are returned, or a flagged address if otherwise.
            // Also setting the stateful variable of url to the first result of the flagged address
          if (response.data.length === 0) {
            setFlaggedToggle('Clean');
          } else {
            setFlaggedToggle('Flagged');
            setUrl(response.data[0]);
          }
          
          // Resetting text input field and toggles
          setUserText("");
          setLoading(false);
          setSubmitToggle(0);

        }, 2000);
      });
    } }, [submitToggle]);


  return (
    <>
      <div className="background">
        <header>
          <div className="wrapper">
            <h1>Phishing Net</h1>
          </div>
        </header>

        <section className="description">
          <div className="wrapper">
              <h2>Tired of being lured by scammers? <span>Untangle yourself using this reel handy app!</span></h2>
              <p>Created by Kevin Kilarski at <a href="https://junocollege.com/">Juno College</a> <span>using the <a href="https://phishstats.info/">PhishStas API</a></span></p>
          </div>
        </section>

        <section className="input">
          <div className="wrapper">
            <form onSubmit={handleSubmit} className="formUrl">
              <label htmlFor="searchUrl">Please Enter a URL:</label>
              <input type="text" onChange={ handleChange } value={ userText} id="searchUrl" className="searchUrlInput" placeholder="Example: https://www.apple.com"></input>
              <button type="submit">Is this Website Phishy?</button>
            </form>
            {/* Rendering certain messages to user based on stateful variables */}
            { needUrl ? <p className="needText">Try using a full address (e.g. <em>http</em>...)</p> : <p className="displayNone">Nothing</p> }
            { needText ? <p className="needText">Enter your url above!</p> : <p className="displayNone">Nothing</p> }
            { submit && !needText && !needUrl ? <LoadingMessage isLoading={isLoading} /> : <p className="displayNone">Nothing</p> }
          </div>
        </section>
      </div>

      {/* Using Output as a parent component to provide uniform template for Flagged and Clean children components */}
      <Output>
        {
          // Rendering whether address is flagged or clean based on stateful variables, and passing properties from url object as props
          submit && flaggedToggle === 'Flagged' ? <Flagged urlAddress={url.url} country={url.countryname} city={url.city} score={url.score} timesFlagged={url.n_times_seen_ip} virus={url.virus_total} /> : submit && flaggedToggle === 'Clean' ? <Clean urlAddress={submit} /> : <p className="displayNone">Nothing</p>
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

