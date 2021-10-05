import StatusMessage from "./StatusMessage.js";

function Input(props) {

  return (
    <section className="input">
      <div className="wrapper">
        <form onSubmit={props.handleSubmit} className="formUrl">
          <label htmlFor="searchUrl">Please Enter a URL:</label>
          <input
            type="text"
            onChange={props.handleChange}
            value={props.userText}
            id="searchUrl"
            className="searchUrlInput"
            placeholder="Example: https://www.apple.com"
          />
          <button type="submit" className="buttonSubmit">Is this Website Phishy?</button>
        </form>
        <StatusMessage status={props.status} />
      </div>
    </section>
  )

}

export default Input;