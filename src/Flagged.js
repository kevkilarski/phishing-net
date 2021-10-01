// function Flagged(props) {
//     const { urlAddress, country, city, score, timesFlagged, virus } = props.urlObject;
//     return (
//         <>
//             <p>FLAGGED! URL: {urlAddress} COUNTRY: {country} CITY: {city} SCORE: {score} TIMES FLAGGED: {timesFlagged} VIRUS: {virus} </p>
//         </>
//     )
// }

// export default Flagged;



function Flagged(props) {
    return props.isLoading ? ( <> <h2>LOADING!!!!!!!!!!!!!!!!!!</h2> {console.log("LOADING!!!")} </> ) : (
        <div className="resultsGroup flaggedGroup">
            <div className="resultsTitle flaggedTitle">
                <p><strong>FLAGGED</strong></p>
                <p>Phishing scams have been reported on this site</p>
            </div>
            <div className="resultsAddress flaggedAddress">
                <p>{props.urlAddress}</p>
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>Country</p>
                <p>{props.country}</p>
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>City</p>
                <p>{props.city}</p>
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>Number of Times Flagged</p>
                <p>{props.timesFlagged}</p>
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>Viruses Detected</p>
                <p>{props.virus}</p>
            </div>
            <div className="resultsDetails flaggedDetails">
                <p>Score (0-10)</p>
                <p>{props.score}</p>
            </div>
            <p>The higher the score, the greater the threat</p>
        </div>
    )
}

export default Flagged;





// function Flagged(props) {
//     return (
//         <>
//             <p>FLAGGED!!! URL: {props.urlAddress} COUNTRY: {props.country} CITY: {props.city} SCORE: {props.score} TIMES FLAGGED: {props.timesFlagged} VIRUS: {props.virus} </p>
//         </>
//     )
// }

// export default Flagged;




// function Flagged(props) {
//     return (
//         <>
//             <p>FLAGGED! URL: {props.urlAddress} </p>
//         </>
//     )
// }

// export default Flagged;