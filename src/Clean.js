function Clean(props) {
    return (
        <div className="resultsGroup cleanGroup">
            <div className="resultsTitle cleanTitle">
                <p><strong>CLEAN</strong></p>
                <p>No phishing scams reported.</p>
            </div>
            <div className="resultsAddress cleanAddress">
                <p>{props.urlAddress}</p>
            </div>
            <div className="resultsDetails cleanDetails">
                <p>Safe waters ahoy!</p>
            </div>
        </div>
    )
}

export default Clean;