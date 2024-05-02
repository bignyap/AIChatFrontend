import React from 'react';
import "../../styles/LeftPane.css";
import AddIcon from '@mui/icons-material/Add';
import ThreadListItem from "../../components/ListItem"
import { createThread, deleteThread, updateThread } from "../../libraries/api";
import Button from '@mui/material/Button';

export default function LeftPane(props) {

    const [threads, setThreads] = React.useState(props.items);

    async function addNewThread() {
        const currentDateISO = new Date().toISOString();
        const name = `New Thread ${currentDateISO}`;
        // const name = `Thread ${threads.length + 1}`;
        const threadId = await createThread(name);
        setThreads(prevThreads => [
            {
                "id": threadId, 
                "creator_id": 2, 
                "date_created": currentDateISO, 
                "name": name,
                "prompt": null
            }, 
            ...prevThreads
        ]);
        props.onSelectThread(threadId);
    };

    async function handleRenameThread(threadID, threadName) {
        try{
            await updateThread(threadID, threadName, null)
            props.onSelectThread(null);
        } catch (error) {
            throw error;
        }
        setThreads(prevThreads => {
            return prevThreads.map(thread => {
                if (thread["id"] === threadID) {
                    return { ...thread, "name": threadName};
                }
                return thread;
            });
        });
    };

    async function handleUpdatePrompt(threadID, threadName, prompt) {
        try{
            await updateThread(threadID, threadName, prompt)
            props.onSelectThread(null);
        } catch (error) {
            throw error;
        }
        setThreads(prevThreads => {
            return prevThreads.map(thread => {
                if (thread["id"] === threadID) {
                    return { ...thread, "prompt": prompt};
                }
                return thread;
            });
        });
    };

    async function handleDeleteThread(threadId) {
        try{
            await deleteThread(threadId)
            props.onSelectThread(null);
        } catch (error) {
            throw error;
        }
        setThreads(prevThreads => prevThreads.filter(thread => thread["id"] !== threadId));
    };

    return (
        <div className="left--pane">
            <div className="sidebar--header">
                <Button variant="contained" endIcon={<AddIcon />} onClick={addNewThread} fullWidth>
                    New Chat
                </Button>
            </div>
            <div>
                <ThreadListItem 
                    items={threads} 
                    onDeleteThread={handleDeleteThread} 
                    onSelectThread={props.onSelectThread}
                    currThread={props.currThread}
                    onRenameThread={handleRenameThread}
                    onUpdateThread={handleUpdatePrompt}
                />
            </div>
        </div>
    )
}
