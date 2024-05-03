import React, { useState, useEffect } from 'react';
import { getChatThreads } from '../../libraries/api';
import ClippedDrawer from '../../components/Common/ClippedDrawer';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

function ChatPage() {
  const [threads, setThreads] = useState(null);
  const [currThread, setCurrThread] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const threadsData = await getChatThreads();
        setThreads(threadsData);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  function handleCurrentThread(threadId) {
    if (threadId) {
      setCurrThread(threadId)
    } else {
      setCurrThread(null)
    };
  }

  if (error) {
    return (
      <div>
        <p>Error fetching chat threads: {error.message}</p>
        {/* Optionally, you can provide a button to retry fetching */}
        {/* <button onClick={() => fetchData()}>Retry</button> */}
      </div>
    );
  }

  if (!threads) {
    return <div>Loading chat threads...</div>;
  }

  return (
    <React.Suspense fallback="">
      <ClippedDrawer
        left={
          <LeftPane
            items={threads.sort((a, b) => b.id - a.id)}
            onSelectThread={handleCurrentThread}
            currThread={currThread}
          />
        }
        right={<RightPane currThread={currThread} />}
      />
    </React.Suspense>
  );
}

export default ChatPage;
