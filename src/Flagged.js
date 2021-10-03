function Flagged(props) {
    return (
        <div className="resultsGroup flaggedGroup">
            <div className="resultsTitle flaggedTitle">
                <p><strong>FLAGGED</strong></p>
                <p>Phishing scams reported!</p>
            </div>
            <div className="resultsAddress flaggedAddress">
                <p>{props.urlAddress}</p>
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>Country</p>
                { props.country == null ? <p>N/A</p> : <p>{props.country}</p> }
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>City</p>
                { props.city == null ? <p>N/A</p> : <p>{props.city}</p> }
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>Viruses as well?</p>
                { props.virus == null ? <p>N/A</p> : <p>{props.virus}</p> }
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>Threat Score (0-10)</p>
                { props.score == null ? <p>N/A</p> : <p>{props.score}</p> }
            </div>
        </div>
    )
}

export default Flagged;