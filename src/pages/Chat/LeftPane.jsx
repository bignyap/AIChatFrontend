import "../../styles/sidebar.css"

export default function LeftPane() {

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Chat History</h3>
                <button className="new-note">+</button>
            </div>
            <div>
                <ThreadTitle />
            </div>
        </section>
    )
}

function ThreadTitle() {

    const numNotes = [...Array(15).keys()]

    return (
        numNotes.map((currNote) => 
            <div className="title">
                <h4 className="text-snippet">{`Thread ${currNote+1}`}</h4>
                <button className="delete-btn">
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        )
    )
}
