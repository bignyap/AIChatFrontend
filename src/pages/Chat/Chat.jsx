import React from "react"
import LeftPane from "./LeftPane"
import RightPane from "./RightPane"
import Split from "react-split"

export default function ChatPage() {
    return (
        <main>
            <Split 
                sizes={[20, 80]} 
                direction="horizontal" 
                className="split"
            >
                <LeftPane />
                <RightPane />
            </Split>
        </main>
    )
}