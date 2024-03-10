import React, { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

export default function FixedBottom(props) {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when the top content changes
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [props.top]); // Re-run effect when top content changes

  return (
    <Box
      sx={{
        width: '100%',
        pb: 7,
        justifyContent: 'center',
        backgroundColor: 'white'
      }}
      ref={scrollRef} // Set ref for scrolling
    >
      <CssBaseline />
      {props.top} {/* Render top content */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 210,
          right: 0,
          backgroundColor: 'white',
          padding: '10px 50px 10px 50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {props.bottom} {/* Render bottom content */}
      </div>
    </Box>
  );
}