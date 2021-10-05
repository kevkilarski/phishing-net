import Clean from "./Clean.js";
import Flagged from "./Flagged.js";

function Output(props) {

  return (
    <section className="output">
      <div className="wrapper">
        <ul className="outputList">
          {
            props.urlRenderList.map((urlItem) => {
              return urlItem.cleanIndicator ? 
              ( <Clean urlItem={urlItem} key={urlItem.key} deferrer={() => props.handleDelete(urlItem.key)} /> ) : 
              ( <Flagged urlItem={urlItem} key={urlItem.key} deferrer={() => props.handleDelete(urlItem.key)} /> );
            })
          }
        </ul>
      </div>
    </section>
  )

}

export default Output;