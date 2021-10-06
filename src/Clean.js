import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function Clean(props) {
  return (
    <li key={props.urlItem.key} className="resultsGroup cleanGroup">
      <div className="resultsTitle cleanTitle">
        <p><strong>CLEAN</strong></p>
        <p>No phishing scams reported</p>
      </div>
      <div className="resultsAddress cleanAddress">
        <p>{props.urlItem.cleanUrlAddress}</p>
      </div>
      <div className="resultsDetails cleanDetails">
        <p>Safe waters ahoy!</p>
      </div>
      <p className="date"><em>Date: {props.urlItem.date}</em></p>
      <button onClick={ props.deferrer } className="buttonDelete"><FontAwesomeIcon className="fontAwesomeDelete" icon={faTimesCircle} size="lg"/></button>
      <p className="itemCount">{props.urlItem.count}</p>
    </li>
    
  );
}

export default Clean;