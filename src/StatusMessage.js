function StatusMessage({status}) {
    return status === 'needText' ?
        ( <p className="status">Provide your Url Above!</p> ) : 
        status === 'needUrl' ? 
        ( <p className="status">Enter a Full Address (e.g. <em>http</em>...)</p> ) :
        status === 'apiLoading' ?
        ( <p className="status statusFlashing">Checking the Net...</p> ) :
        status === 'apiComplete' ?
        ( <p className="status">See Your Catch Below!</p> ) : 
        null;
}

export default StatusMessage;