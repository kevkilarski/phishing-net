// importing additional features
import axios from "axios";
import realtime from "./firebase";
import { useEffect, useState } from "react";
import { ref, onValue, push, remove } from "firebase/database";
import "./App.css";



// importing components
import Input from "./Input.js";
import Output from "./Output.js";

const App = () => {

  // Storing api infomation for render
  const [urlRenderList, setUrlRenderList] = useState([]);
  // Storing values of text input
  const [userText, setUserText] = useState("");
  // Storing variable that will trigger appropriate status message render
  const [status, setStatus] = useState("");


  // useEffect hook for firebase subscription
  useEffect(() => {
    const dbRef = ref(realtime);

    onValue(dbRef, (snapshot) => {
      const urlReactDB = snapshot.val();

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
          date: urlReactDB[item].date,
        };

        urlRenderArray.push(urlObjectBlock);
      }

      setUrlRenderList(urlRenderArray);
    });
  }, []);


  // Function to set userText stateful variable with user input
  const handleChange = (event) => {
    setUserText(event.target.value);
  };


  // Function to call api upon form submission and send pertinent api data to firebase
  const handleSubmit = (event) => {
    event.preventDefault();

    const dbRef = ref(realtime);

    // Parsing user text to determine if a full url is provided
    const urlCheck = userText.substr(0, 4);

    // Conditional logic to either require an http prefix, require entering any text, or submit the user text
    if (userText && urlCheck !== "http") {
      setStatus("needUrl");
      setUserText("");
    } else if (!userText) {
      setStatus("needText");
    } else {
      setStatus("apiLoading");
      
      axios({
        method: "GET",
        url: "https://phishstats.info:2096/api/phishing",
        dataResponse: "json",
        params: {
          _where: `(url,eq,${userText})`,
          _sort: "-id",
        },
      }).then((response) => {

        // This timeout was added only to demonstrate a 'loading' feature for the api that I worked on.  It would be removed for a production build.
        setTimeout(() => {
          const date = new Date().toString().substr(0, 15);

          // If no objects found in the target api call, create 'clean' object to send to firebase. Otherwise, create 'flagged' object.
          if (response.data.length === 0) {
            const apiRevisedClean = {};
            apiRevisedClean.cleanIndicator = true;
            apiRevisedClean.cleanUrlAddress = userText;
            apiRevisedClean.date = date;
            push(dbRef, apiRevisedClean);
          } else {
            const apiRevisedFlagged = {};
            apiRevisedFlagged.key = response.data[0].id;
            apiRevisedFlagged.url = response.data[0].url;
            apiRevisedFlagged.countryname = response.data[0].countryname;
            apiRevisedFlagged.city = response.data[0].city;
            apiRevisedFlagged.virus_total = response.data[0].virus_total;
            apiRevisedFlagged.score = response.data[0].score;
            apiRevisedFlagged.date = date;
            push(dbRef, apiRevisedFlagged);
          }

          // Resetting text input and updating status
          setUserText("");
          setStatus("apiComplete");
        }, 2000);
      });
    }
  };

  // Function to delete an item upon button click
  const handleDelete = (keyOfItemToDelete) => {
    const specificNodeRef = ref(realtime, keyOfItemToDelete); // Not refernecing the whole database, just a specific child node, and the second argument is a relative path inside our database to the node we wish to target
    remove(specificNodeRef);
  }

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

        <Input 
          handleSubmit={handleSubmit} 
          handleChange={handleChange} 
          userText={userText} 
          status={status} 
        />
      </div>

      <Output 
        urlRenderList={urlRenderList}
        handleDelete={handleDelete}
      />

    </>
  );
};

export default App;