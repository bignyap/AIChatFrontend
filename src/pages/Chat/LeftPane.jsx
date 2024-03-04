import "../../styles/sidebar.css"

export default function LeftPane(props) {
    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Chat History</h3>
                <button className="new-note">+</button>
            </div>
            <div>
                <ThreadTitle items={props.items} />
            </div>
        </section>
    )
}

function ThreadTitle(props) {

    return (
        props.items.map((currThread) => 
            <div className="title">
                <h4 className="text-snippet">{currThread[3]}</h4>
                <button className="delete-btn">
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        )
    )
}
