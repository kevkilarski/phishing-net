import StatusMessage from "./StatusMessage.js";

function Input({handleSubmit, handleChange, userText, status}) {
  return (

    <section className="input">
      <div className="wrapper">

        <form onSubmit={handleSubmit} className="formUrl">
          <label htmlFor="searchUrl">Please Enter a URL:</label>
          <input
            type="text"
            onChange={handleChange}
            value={userText}
            id="searchUrl"
            className="searchUrlInput"
            placeholder="Example: https://www.apple.com"
          />
          <button type="submit" className="buttonSubmit">Is this Website Phishy?</button>
        </form>

        <StatusMessage status={status} />

      </div>
    </section>

  )
}

export default Input;