import React, { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

export default function FixedBottom(props) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [props.top]);

  return (
    <Box
      sx={{
        width: '100%',
        pb: 7,
        justifyContent: 'center',
        backgroundColor: 'white'
      }}
      ref={scrollRef}
    >
      <CssBaseline />
      {props.top}
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
        {props.bottom}
      </div>
    </Box>
  );
}
