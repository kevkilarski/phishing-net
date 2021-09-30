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
    return (
        <>
            <p>FLAGGED! URL: {props.urlAddress} COUNTRY: {props.country} CITY: {props.city} SCORE: {props.score} TIMES FLAGGED: {props.timesFlagged} VIRUS: {props.virus} </p>
        </>
    )
}

export default Flagged;




// function Flagged(props) {
//     return (
//         <>
//             <p>FLAGGED! URL: {props.urlAddress} </p>
//         </>
//     )
// }

// export default Flagged;