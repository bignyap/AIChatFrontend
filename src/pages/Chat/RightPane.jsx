import React, {useState, useEffect} from "react"
import ModelSelector from "./ModelSelector"
import MultiLineTextField from "../../components/TextField"
import "../../styles/rightpane.css"
import { getThreadMessages } from "../../libraries/api"

export default function RightPane(props) {

    return (
        <div className="right--pane">
            {/* <ChatOptionPane /> */}
            <ChatPane
                currThread={props.currThread}
            />
        </div>
    )
    
}

function ChatPane(props) {
    return (
        <section className="chat--pane">
            <ChatHistory
                currThread={props.currThread}
            />
            <UserMessage />
        </section>
    )
}


function ChatHistory(props) {

    const [contents, setContents] = useState([]);

    useEffect(() => {
        const fetchThreadMessages = async () => {
            if (props.currThread) { // Check if currThread is defined
                const messages = await getThreadMessages(props.currThread);
                setContents(messages);
            } else {
                setContents([]);
            }
        };
    
        fetchThreadMessages();
    }, [props.currThread]);    

    return (
        <div className="chat--history--wrapper">
            <section className="chat--history">
                {contents.map((content, index) => <ChatMessage key={index} content={content} />)}
            </section>
        </div>
    )
}


function ChatMessage(prop) {
    return (
        <div className="chat--message">
            <div className="role--message">{prop.content.role === "user" ? "User" : "Assistant"}</div>
            <div className="data--message">{prop.content.message}</div>
        </div>
    )
}


function UserMessage() {
    return (
        <section className="user--input">
            <MultiLineTextField />
        </section>
    )
}

function ChatOptionPane() {
    const models = [
        {
            "index": 1,
            "name": "gpt-3.5-turbo-0125"
        },
        {
            "index": 2,
            "name": "gpt-3.5-turbo-1106"
        },
        {
            "index": 3,
            "name": "gpt-4-1106-preview"
        },
        {
            "index": 4,
            "name": "gpt-4-1106-vision-preview"
        }
    ]

    const prompts = [
        {
            "index": 1,
            "name": "Interviewer",
            "prompt": ""
        },
        {
            "index": 2,
            "name": "Chat Assistant",
            "prompt": ""
        }
    ]
    
    return (
        <section className="chat--option--pane">
            <h4>Model</h4>
            <ModelSelector
                models = {models}
            />
            <h4>Prompt</h4>
            <ModelSelector
                models = {prompts}
            />
        </section>
    )
}






