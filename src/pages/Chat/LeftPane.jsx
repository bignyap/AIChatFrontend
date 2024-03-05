import React from 'react';
import "../../styles/sidebar.css";
import { createThread, deleteThread } from "../../libraries/api";

export default function LeftPane(props) {

    const [threads, setThreads] = React.useState(props.items);

    async function addNewThread() {
        const currentDateISO = new Date().toISOString();
        const name = `New Thread ${currentDateISO}`;
        const threadId = await createThread(name);
        setThreads(prevThreads => [[threadId, 1, currentDateISO, name], ...prevThreads]);
    };

    async function handleDeleteThread(threadId) {
        try{
            await deleteThread(threadId)
        } catch (error) {
            throw error;
        }
        setThreads(prevThreads => prevThreads.filter(thread => thread[0] !== threadId));
    };

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Chat History</h3>
                <button className="new-note" onClick={addNewThread}>+</button>
            </div>
            <div>
                <ThreadTitle 
                    items={threads} 
                    onDeleteThread={handleDeleteThread} 
                    onSelectThread={props.onSelectThread}
                    currThread={props.currThread} 
                />
            </div>
        </section>
    )
}

function ThreadTitle(props) {

    return (
        props.items.map((currThread) => (
            <div key={currThread[0]} className="title">
                {
                    props.currThread === currThread[0] 
                    ? <h4 className="text-snippet-selected" onClick={() => props.onSelectThread(currThread[0])}>{currThread[3]}</h4>
                    : <h4 className="text-snippet" onClick={() => props.onSelectThread(currThread[0])}>{currThread[3]}</h4>
                }
                <button className="delete-btn" onClick={() => props.onDeleteThread(currThread[0])}>
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        )
    ))
}
