function Flagged({urlData}) {
    return (
        <div className="resultsGroup flaggedGroup">
            <div className="resultsTitle flaggedTitle">
                <p><strong>FLAGGED</strong></p>
                <p>Phishing scams reported!</p>
            </div>
            <div className="resultsAddress flaggedAddress">
                <p>{urlData.urlAddress}</p>
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>Country</p>
                { urlData.country == null ? <p>N/A</p> : <p>{urlData.country}</p> }
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>City</p>
                { urlData.city == null ? <p>N/A</p> : <p>{urlData.city}</p> }
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>Viruses as well?</p>
                { urlData.virus == null ? <p>N/A</p> : <p>{urlData.virus}</p> }
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>Threat Score (0-10)</p>
                { urlData.score == null ? <p>N/A</p> : <p>{urlData.score}</p> }
            </div>
        </div>
    )
}

export default Flagged;