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
    </li>
  );
}

export default Clean;