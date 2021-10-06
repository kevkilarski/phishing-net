import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function Flagged({urlItem, deferrer}) {
  return (

    <li className="resultsItem flaggedItem">
      
      <p className="resultsTitle flaggedTitle"><strong>FLAGGED</strong></p>
      <p className="resultsReport flaggedReport">Phishing scams reported!</p>

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

      <button onClick={ deferrer } className="buttonDelete">
        <FontAwesomeIcon className="fontAwesomeDelete" icon={faTimesCircle} size="lg">
          <span className="sr-only">Delete this item from the list</span>
        </FontAwesomeIcon>
      </button>
      
      <p className="itemCount">{urlItem.count}</p>
      
    </li>

  );
}

export default Flagged;