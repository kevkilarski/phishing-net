import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function Clean({urlItem, deferrer}) {
  return (

    <li className="resultsItem cleanItem">

      <p className="resultsTitle cleanTitle"><strong>CLEAN</strong></p>
      <p className="resultsReport cleanReport">No phishing scams reported</p>

      <div className="resultsAddress cleanAddress">
        <p>{urlItem.cleanUrlAddress}</p>
      </div>

      <p className="resultsDetails cleanDetails">Safe waters ahoy!</p>
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

export default Clean;