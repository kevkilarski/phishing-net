// NOTES:
  // Websites to test the app:
    // Flagged: https://applecloud-ma.com/, http://apple.com-icloud.top/, http://microsoft-dateserver.com/
    // Clean: https://www.apple.com, https://www.microsoft.com, https://junocollege.com

// importing additional features
import axios from "axios";
import realtime from "./firebase";
import { useEffect, useState } from "react";
import { ref, onValue, push, remove } from "firebase/database";
import "./App.css";

// importing components
import Input from "./Input.js";
import Output from "./Output.js";
// import { faBookDead } from "@fortawesome/free-solid-svg-icons";

const App = () => {

  // Storing api infomation for render
  const [urlRenderList, setUrlRenderList] = useState([]);
  // Storing values of text input
  const [userText, setUserText] = useState("");
  // Storing variable that will trigger appropriate status message to user
  const [status, setStatus] = useState("");
  // Storing local variable to toggle if site is active (desire it to be reset each render, so local variable selected for versatility)
  let activeSite = false;
  const [live, setLive] = useState(false);

  // // Storing toggle for active site function
  // const [activeSite, setActiveSite] = useState(false);



  // useEffect hook for firebase subscription
  useEffect(() => {
    const dbRef = ref(realtime);

    onValue(dbRef, (snapshot) => {
      const urlReactDB = snapshot.val();

      // Counter is used to index the nodes upon render
      let counter = 1;
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
          count: counter
        };
        counter = counter + 1;
        // if (counter === 2) {
        //   setStatus('previousItems');
        // }
        urlRenderArray.push(urlObjectBlock);
      }
      setUrlRenderList(urlRenderArray);
    });
  }, []);

  // Function to set userText stateful variable with user input
  const handleChange = (event) => {
    setUserText(event.target.value);
  };




  // Function to check if website it active
  async function activeSiteCheck() {
    // axios
    // .get(userText, 'Access-Control-Allow-Origin: *')
    //   .then((response) => {
    //     console.log(response);
    //     setActiveSite(true);
    //   })
    //   .catch((reason) => {
    //     console.log("ERROR")
    //   })


    
    const test = fetch(userText, { mode: 'no-cors' })
      .then((response) => {

        if (response.status === 0) {
          setLive(true);
        } else {
          setLive(false);
        }

      })
      .catch((reason) => {
        setLive(false);
        console.log("ERROR")
      })

await test;

    // axios({
    //   method: "GET",
    //   url: "https://www.google.com",
    //   // 'Access-Control-Allow-Origin': '*',
    //   // withCredentials: false,
    //   mode: 'no-cors',
    //   dataResponse: "jsonp"
    // })
    // .then((response) => {
    //   console.log("YEP");
    //   setActiveSite(true);
    // })
    // .catch((reason) => {
    //   console.log("ERROR")
    // })
  }




  // Function to call api upon form submission and send pertinent api data to firebase
  const handleSubmit = (event) => {
    event.preventDefault();

    const dbRef = ref(realtime);

    // Parsing user text to determine if a full url is provided
    const urlCheck = userText.substring(0, 4);



  
      // axios
      // .get(userText, 'Access-Control-Allow-Origin: *')
      //   .then((response) => {
      //     console.log(response);
      //     setActiveSite(true);
      //   })
      //   .catch((reason) => {
      //     console.log("ERROR")
      //   })
  
  
      
      fetch(userText, { mode: 'no-cors' })
        .then((response) => {
  
          if (response.status === 0) {
            setLive(true);
            activeSite = true;
          } else {
            setLive(false);
            activeSite = false;
          }
  
        })
        .catch((reason) => {
          setLive(false);
          activeSite = false;
          console.log("ERROR")
        })
  


    // Conditional logic to either require an http prefix, require entering any text, or submit the user text
    if (userText && urlCheck !== "http") {
      setStatus("needUrl");
      setUserText("");
    } else if (!userText) {
      setStatus("needText");
    } else if (activeSite === false) {
      console.log("NOT GONNA HAPPEN")
    } else if (activeSite === true) {
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
              const date = new Date().toString().substring(0, 15);

              // If no objects found in the target api call, create 'clean' object to send to firebase. Otherwise, create 'flagged' object.
              // I chose to deconstruct the api return because of the high number of properties retreived with each call.
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
    const specificNodeRef = ref(realtime, keyOfItemToDelete);
    remove(specificNodeRef);
    setStatus("deletedItem");
  }

  return (
    <>
      <div className="background">
        
        <header>
          <div className="wrapper">
            <h1>The <span className="displayBlock">Phishing</span> <span className="displayBlock">Net</span></h1>
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