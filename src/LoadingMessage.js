function LoadingMessage(props) {
    return props.isLoading ? ( <p className="loadingFlash">Checking the Net...</p> ) : 
    (
        <p className="loadingFound">See your Catch Below!</p>
    )
}

export default LoadingMessage;