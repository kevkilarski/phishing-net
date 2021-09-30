// importing additional features
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

// importing components
import Output from './Output.js';
import Clean from './Clean.js';
import Flagged from './Flagged.js';


function App() {




  // Utilizing useState Hook to store data from each API call, to be used a a prop
  const [url, setUrl] = useState({});



  // Utilizing useState Hook to store text field information
  const [userText, setUserText] = useState();


  // Utilizing useState Hook to store toggle for flagged urls
  const [flaggedToggle, setFlaggedToggle] = useState();





  // Function to handle user input submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle Submit", event.target[0].value);
    setUserText(event.target[0].value);
    console.log(userText);
    // setUserText('');
  }


  const handleChange = (event) => {
    // console.log("Handle Change", event);
    // setUserText(event.target.value);
  }


  
  // Utilizing useEffect Hook for API call, to render when necessary
  useEffect( () => {
    axios({
      method: 'GET',
      url: 'https://phishstats.info:2096/api/phishing',
      dataResponse: 'json',
      params: {
        _where: `(url,like,~${userText}~)`,
        // _where: '(url,eq,https://applecloud-ma.com/)',
        _sort: '-id'
      }
    }).then( (response) => {
      console.log("API RESPONSE", response);
      console.log("USER TEXT", userText);
      console.log("API RESPONSE FOR STATE", response.data[0]);


      if (response.data.length === 0) {
        setFlaggedToggle(false);
      } else {
        setFlaggedToggle(true);
        setUrl(response.data[0]);
      }




      // Setting the state to the flagged or an empty string if unflagged
      // response.data.length === 0 ? setUrl('') : setUrl([response.data[0].url, response.data[0].city]);
      

      // if (response.data.length === 0) {
      //   urlData.flagged = false;
      //   urlData.urlAddress = 'https://cleanurl.com/';
      //   setUrl(urlData)
      // } else {
      //   urlData.flagged = true;
      //   urlData.urlAddress = response.data[0].url;
      //   urlData.country = response.data[0].countryname;
      //   urlData.city = response.data[0].city;
      //   urlData.score = response.data[0].score;
      //   urlData.timesFlagged = response.data[0].n_times_seen_ip;
      //   urlData.virus = response.data[0].virus_total;
      //   setUrl(urlData);
      // }


      // if (response.data.length === 0) {
      //   setUrl('');
      // } else {
      //   setUrl(response.data[0].url);
      // }


    });
  }, [userText]);


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
          <form onSubmit={handleSubmit} className="formUrl">
            <label htmlFor="searchUrl" className="searchUrlLabel">Please enter a URL:</label>
            <input type="text" id="searchUrl" className="searchUrlInput" id="searchUrl" placeholder="Example: apple.com"></input>
            <button type="submit">Submit URL</button>
          </form>
        </div>
      </section>


      <Output>
        {
          // urlData.flagged === true ? <Flagged urlObject={urlData} /> : <Clean urlAddress={urlData.urlAddress} />
          // urlData.flagged === true ? <Flagged urlAddress={urlData.urlAddress} country={urlData.country} city={urlData.city} score={urlData.score} timesFlagged={urlData.timesFlagged} virus={urlData.virus}/> : <Clean urlAddress={urlData.urlAddress} />
          // url ? <Flagged urlAddress={url}/> : <Clean urlAddress={url} />
          flaggedToggle === true ? <Flagged urlAddress={url.url} country={url.country} city={url.city} score={url.score} timesFlagged={url.n_times_seen_ip} virus={url.virus_total} /> : <Clean urlAddress={userText} />
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

