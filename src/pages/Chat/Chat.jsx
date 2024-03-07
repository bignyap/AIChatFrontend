import React from "react"
import {
    useLoaderData,
    defer,
    Await,
} from "react-router-dom"

import LeftPane from "./LeftPane"
import RightPane from "./RightPane"

import { getChatThreads } from "../../libraries/api"

import ClippedDrawer from "../../components/ClippedDrawer"


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
        <React.Suspense fallback={""}>
                <Await resolve={dataPromise.threads}>
                    {(resolvedThreds) => 
                        <ClippedDrawer 
                            left={
                                <LeftPane 
                                    items={resolvedThreds} 
                                    onSelectThread={handleCurrentThread} 
                                    currThread={currThread} 
                                />
                            }
                            right = {
                                <RightPane 
                                currThread={currThread} 
                            />
                            }
                        />
                    }
                </Await>
            </React.Suspense>
    )
}