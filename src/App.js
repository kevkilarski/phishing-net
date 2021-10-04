// importing additional features
import axios from 'axios';
import { useEffect, useState } from 'react';
import realtime from './firebase';
import { ref, onValue, push } from 'firebase/database';
import './App.css';

// importing components
import StatusMessage from './StatusMessage.js';
import Output from './Output.js';
import Clean from './Clean.js';
import Flagged from './Flagged.js';
import TestFile from './TestFile.js';


const App = () => {

  // useState Hooks
    // Storing object from each API call
    // const [urlData, setUrlData] = useState([]);

    const [urlRenderList, setUrlRenderList] = useState([]);

    
    // Storing values of text input
    const [userText, setUserText] = useState('');
    
    // Storing finalized text input for submission
    const [first, setFirst] = useState();

    // Storing toggle for submission event (used for error handling, otherwise a duplicate text input submission would not trigger useEffect)
    const [submitToggle, setSubmitToggle] = useState(0);

    // Storing toggle for flagged urls for phishing scams
    const [flaggedToggle, setFlaggedToggle] = useState('');

     // Storing variable that will trigger appropriate status message render
    const [status, setStatus] = useState('');








  // Function to set userText state with user input
  const handleChange = (event) => {
    setUserText(event.target.value);
  }









  // Function to set userSubmit with userText, triggering api call
  const handleSubmit = (event) => {
    event.preventDefault();

            const dbRef = ref(realtime);



   // Parsing beginning of user text to determine if a full url is provided
    const urlCheck = userText.substr(0,4);

    // Conditional logic to either require an http prefix, require entering any text, or submit the user text
    if (userText && urlCheck !== "http") {
      setStatus('needUrl');
      setUserText("");
    } else if (!userText) {
      setStatus('needText');
    } else {
      setStatus('apiLoading');

      // const dbRef = ref(realtime);
      // push(dbRef, userText);


    





    axios({
      method: 'GET',
      url: 'https://phishstats.info:2096/api/phishing',
      dataResponse: 'json',
      params: {
        _where: `(url,eq,${userText})`,
        _sort: '-id'
      }
      }).then( (response) => {

        // This timeout was added only to demonstrate a 'loading' feature for the api that I worked on.  It would be removed for production build.
        setTimeout(() => {


            const date = new Date();
            const dateFormatted = date.toString().substr(0, 15);
            console.log(dateFormatted);



          if (response.data.length === 0) {
            // setFlaggedToggle('Clean');
            // setCleanUrl(userText);
            let newTest = {};

            newTest.cleanIndicator = 'yes';
            newTest.cleanUrlAddress = userText;
            newTest.date = dateFormatted;

            push(dbRef, newTest);

          } else {

            let apiRevisedObject = {};
            apiRevisedObject.key = response.data[0].id;
            apiRevisedObject.url = response.data[0].url;
            apiRevisedObject.countryname = response.data[0].countryname;
            apiRevisedObject.city = response.data[0].city;
            apiRevisedObject.virus_total = response.data[0].virus_total;
            apiRevisedObject.score = response.data[0].score;
            apiRevisedObject.date = dateFormatted;

            push(dbRef, apiRevisedObject);
            // push(dbRef, response.data[0]);
          }
          
          // Setting text input field and toggles
          setUserText("");
          setStatus('apiComplete');


        }, 2000);

      })
    
      };

    }


















    // // Parsing beginning of user text to determine if a full url is provided
    // const urlCheck = userText.substr(0,4);

    // // Conditional logic to either require an http prefix, require entering any text, or submit the user text
    // if (userText && urlCheck !== "http") {
    //   setStatus('needUrl');
    //   setUserText("");
    // } else if (!userText) {
    //   setStatus('needText');
    // } else {
    //   setStatus('apiLoading');
    //   setSubmitToggle(1);

    //   // const dbRef = ref(realtime);
    //   // push(dbRef, userText);


    // }
  









  // useEffect Hook for API call
  useEffect( () => {

    const dbRef = ref(realtime);

    onValue(dbRef, (snapshot) => {

      const urlReactDB = snapshot.val();
      console.log("URL COLLECTION", urlReactDB);

      const urlRenderArray = [];

      for (let item in urlReactDB) {

        const urlObjectBlock = {
          key: item,
          urlAddress: urlReactDB[item].url,
          country: urlReactDB[item].countryname,
          city: urlReactDB[item].city,
          virus: urlReactDB[item].virus_total,
          score: urlReactDB[item].score,
          cleanIndicator: urlReactDB[item].cleanIndicator,
          cleanUrlAddress: urlReactDB[item].cleanUrlAddress,
          date: urlReactDB[item].date
        }

        urlRenderArray.push(urlObjectBlock);

      }

      // const testing = urlRenderArray.reverse();
      setUrlRenderList(urlRenderArray);

    });
}, []);



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
            {/* Rendering status message to user */}
            <StatusMessage status={status} />
          </div>
        </section>
      </div>

      {/* Using Output as a parent component to provide uniform template for Flagged and Clean children components */}
      <section className="output">
        <div className="wrapper">
          <ul className="outputList">
              {
                urlRenderList.map( (urlItem) => {
                  // <Flagged urlCity={urlItem.country} />
                  return (
                    
                      urlItem.cleanIndicator === 'yes' ? <Clean urlItem={urlItem}/> : <Flagged urlItem={urlItem} first={first}/>

                    
                  )

                  // return (
                  //   // <p>{urlItem.country}</p>
                  //   )
                })
              }
          </ul>
        </div>
    </section>
        {
          // Rendering whether address is flagged or clean based on stateful variables, and passing properties from url object as props
          // flaggedToggle === 'Flagged' ? <Flagged urlData={urlRenderList}/> : flaggedToggle === 'Clean' ? <Clean urlAddress={cleanUrl} /> : null
        }

{/* 
        <ul>
          {
            urlRenderList.map((item) => {

              return (
                <div className="resultsGroup flaggedGroup">
                  <div className="resultsTitle flaggedTitle">
                      <p><strong>FLAGGED</strong></p>
                      <p>Phishing scams reported!</p>
                  </div>
                  <div className="resultsAddress flaggedAddress">
                      <p>{item.urlAddress}</p>
                  </div>
                  <div className="resultsDetails flaggedDetails">
                      <p>Country</p>
                      { item.country == null ? <p>N/A</p> : <p>{item.country}</p> }
                  </div>
                  <div className="resultsDetails flaggedDetails">
                      <p>City</p>
                      { item.city == null ? <p>N/A</p> : <p>{item.city}</p> }
                  </div>
                  <div className="resultsDetails flaggedDetails">
                      <p>Viruses as well?</p>
                      { item.virus == null ? <p>N/A</p> : <p>{item.virus}</p> }
                  </div>
                  <div className="resultsDetails flaggedDetails">
                      <p>Threat Score (0-10)</p>
                      { item.score == null ? <p>N/A</p> : <p>{item.score}</p> }
                  </div>
                </div>
              )
          })

        }
    </ul> */}

    {/* </Output> */}


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

