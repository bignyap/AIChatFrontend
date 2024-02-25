import "../styles/rightpane.css"
import ModelSeletor from "./ModelSelector"
import MultiLineTextField from "./TextField"

export default function RightPane() {
    
    return (
        <div className="right--pane">
            <ChatOptionPane />
            <ChatPane />
        </div>
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
            <ModelSeletor
                models = {models}
            />
            <h4>Prompt</h4>
            <ModelSeletor
                models = {prompts}
            />
        </section>
    )
}

function ChatPane() {
    return (
        <section className="chat--pane">
            <ChatHistroy />
            <UserMessage />
        </section>
    )
}


function ChatHistroy() {

    const contents = [
        {
            "message_id": 1,
            "thread_id": 1,
            "role": "user",
            "message": "Somzvcjdvj jshgcyau ydyadkcv ssdfd ugfyufiyaf gifdfgdsifiuds giudfbdgdiufgud afgdgfiafgoubadfugo aufiusdgfiudsgf iauGDFIUAFL"
        },
        {
            "message_id": 2,
            "thread_id": 1,
            "role": "assistant",
            "message": "Somzvcjdvj jshgcyau ydyadkcv ssdfd ugfyufiyaf gifdfgdsifiuds giudfbdgdiufgud"
        }
    ]

    return (
        <div className="chat--history--wrapper">
            <section className="chat--history">
                {contents.map((content) => <ChatMessage content={content}/>)}
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






