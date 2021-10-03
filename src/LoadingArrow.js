function LoadingArrow(props) {
    return props.isLoading ? ( <p className="loadingFlash">Checking the Net...</p> ) : 
    (
        // <div className="loadingArrow"></div>
        <p className="loadingFound">See your Catch Below!</p>
    )
}

export default LoadingArrow;




// function LoadingArrow(props) {
//     return props.isLoading ? ( <p className="loadingFlash">Checking the Net...</p> ) : 
//     (
//         <p className="displayNone">Nothing</p>
//     )
// }

// export default LoadingArrow;