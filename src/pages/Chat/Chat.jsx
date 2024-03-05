import React from "react"
import Split from "react-split"
import {
    useLoaderData,
    defer,
    Await,
} from "react-router-dom"

import LeftPane from "./LeftPane"
import RightPane from "./RightPane"

import { getChatThreads } from "../../libraries/api"


export function loader() {
    return defer({ threads: getChatThreads() })
}

export default function ChatPage() {

    const dataPromise = useLoaderData()

    const [currThread, setCurrThread] = React.useState(null)

    async function handleCurrentThread(threadId) {
        setCurrThread((prvThreadId) => prvThreadId === threadId ? prvThreadId : threadId);
    }

    return (
        <main>
            <React.Suspense fallback={""}>
                <Await resolve={dataPromise.threads}>
                    {(resolvedThreds) => 
                        <Split 
                            sizes={[20, 80]} 
                            direction="horizontal" 
                            className="split"
                        >
                            <LeftPane 
                                items={resolvedThreds} 
                                onSelectThread={handleCurrentThread} 
                                currThread={currThread} 
                            />
                            <RightPane 
                                currThread={currThread} 
                            />
                        </Split>
                    }
                </Await>
            </React.Suspense>
        </main>
    )
}