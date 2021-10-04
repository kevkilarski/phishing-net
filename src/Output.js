function Output(props) {
    return (

    <section className="output">
        <div className="wrapper">
            <ul>
                {
                    props.urlRenderList.map( (item) => {
                        return (
                            props.children
                        )
                    })
                }
            </ul>
        </div>
    </section>

    )

}

export default Output;