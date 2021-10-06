import Clean from "./Clean.js";
import Flagged from "./Flagged.js";

function Output({urlRenderList, handleDelete}) {
  return (

    <section className="output">
      <div className="wrapper">

        <ul className="resultsList">
          {
            urlRenderList.map((urlItem) => {
              return urlItem.cleanIndicator ? 
              ( <Clean urlItem={urlItem} key={urlItem.key} deferrer={() => handleDelete(urlItem.key)} /> ) : 
              ( <Flagged urlItem={urlItem} key={urlItem.key} deferrer={() => handleDelete(urlItem.key)} /> );
            })
          }
        </ul>

      </div>
    </section>

  )
}

export default Output;