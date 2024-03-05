import React from "react"
import Split from "react-split"
import {
    // Link,
    // useSearchParams,
    useLoaderData,
    defer,
    Await
} from "react-router-dom"

import LeftPane from "./LeftPane"
import RightPane from "./RightPane"

import { getChatThreads } from "../../libraries/api"


export function loader() {
    return defer({ threads: getChatThreads() })
}

export default function ChatPage() {

    const dataPromise = useLoaderData()

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
                            <LeftPane items={resolvedThreds} />
                            <RightPane />
                        </Split>
                    }
                </Await>
            </React.Suspense>
        </main>
    )
}