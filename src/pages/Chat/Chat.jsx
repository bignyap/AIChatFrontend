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
    return defer({ ln: getChatThreads() })
}

export default function ChatPage() {

    const dataPromise = useLoaderData()

    return (
        <main>
            <Split 
                sizes={[20, 80]} 
                direction="horizontal" 
                className="split"
            >
                <React.Suspense fallback={<h2>Authenticating...</h2>}>
                    <Await resolve={dataPromise.ln}>
                        {(resolvedReviews) => <LeftPane items={resolvedReviews} />}
                    </Await>
                </React.Suspense>
                <RightPane />
            </Split>
        </main>
    )
}