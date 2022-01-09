function StatusMessage({status}) {
    return status === 'needText' ?
        ( <p className="status">Provide your Url Above!</p> ) : 
        status === 'needUrl' ? 
        ( <p className="status">Enter a Full Address (e.g. <em>http</em>...)</p> ) :
        status === 'apiLoading' ?
        ( <p className="status statusFlashing">Checking the Net...</p> ) :
        status === 'apiComplete' ?
        ( <p className="status">See Your Catch Below!</p> ) : 
        status === 'deletedItem' ?
        ( <p className="status">You Cut The Line!</p> ) : 
        status === 'notActiveSite' ?
        ( <p className="status">Please Enter a Real Site!</p> ) :
        null;
}

export default StatusMessage;