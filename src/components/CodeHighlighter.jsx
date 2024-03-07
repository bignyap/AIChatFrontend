import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core'; // Import only core Highlight.js library
import 'highlight.js/styles/default.css'; // Import a style from Highlight.js

const CodeHighlighter = ({ code }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current); // Auto-detect and highlight the code
    }
  }, [code]);

  return (
    <pre>
      <code ref={codeRef}>
        {code}
      </code>
    </pre>
  );
};

export default CodeHighlighter;
