import Clean from "./Clean.js";
import Flagged from "./Flagged.js";

function Output(props) {

    return (
        <section className="output">
        <div className="wrapper">
          <ul className="outputList">
            {
              props.urlRenderList.map((urlItem) => {
                return urlItem.cleanIndicator ? 


                ( <li key={urlItem.key} className="resultsGroup cleanGroup">
      <div className="resultsTitle cleanTitle">
        <p><strong>CLEAN</strong></p>
        <p>No phishing scams reported</p>
      </div>
      <div className="resultsAddress cleanAddress">
        <p>{urlItem.cleanUrlAddress}</p>
      </div>
      <div className="resultsDetails cleanDetails">
        <p>Safe waters ahoy!</p>
      </div>
      <p className="date"><em>Date: {urlItem.date}</em></p>
    </li> ) : 

                ( <li key={urlItem.key} className="resultsGroup flaggedGroup">
                <div className="resultsTitle flaggedTitle">
                  <p><strong>FLAGGED</strong></p>
                  <p>Phishing scams reported!</p>
                </div>
                <div className="resultsAddress flaggedAddress">
                  <p>{urlItem.urlAddress}</p>
                </div>
                <div className="resultsDetails flaggedDetails">
                  <p>Country</p>
                  {urlItem.country == null ? <p>N/A</p> : <p>{urlItem.country}</p>}
                </div>
                <div className="resultsDetails flaggedDetails">
                  <p>City</p>
                  {urlItem.city == null ? <p>N/A</p> : <p>{urlItem.city}</p>}
                </div>
                <div className="resultsDetails flaggedDetails">
                  <p>Viruses as well?</p>
                  {urlItem.virus == null ? <p>N/A</p> : <p>{urlItem.virus}</p>}
                </div>
                <div className="resultsDetails flaggedDetails">
                  <p>Threat Score (0-10)</p>
                  {urlItem.score == null ? <p>N/A</p> : <p>{urlItem.score}</p>}
                </div>
                <p className="date"><em>Date: {urlItem.date}</em></p>
              </li> );
              })
            }
          </ul>
        </div>
      </section>

    )

}

export default Output;