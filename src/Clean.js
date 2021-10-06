import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function Clean(props) {
  return (

    <li key={props.urlItem.key} className="resultsItem cleanItem">

      <p className="resultsTitle cleanTitle"><strong>CLEAN</strong></p>
      <p className="resultsReport cleanReport">No phishing scams reported</p>

      <div className="resultsAddress cleanAddress">
        <p>{props.urlItem.cleanUrlAddress}</p>
      </div>

      <p className="resultsDetails cleanDetails">Safe waters ahoy!</p>
      <p className="date"><em>Date: {props.urlItem.date}</em></p>
      <button onClick={ props.deferrer } className="buttonDelete"><FontAwesomeIcon className="fontAwesomeDelete" icon={faTimesCircle} size="lg"/></button>
      <p className="itemCount">{props.urlItem.count}</p>
      
    </li>

  );
}

export default Clean;