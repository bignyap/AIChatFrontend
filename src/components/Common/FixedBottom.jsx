import Box from '@mui/material/Box';

export default function FixedBottom(props) {
  return (
    <Box
      sx={{
        width: '100%',
        pb: 7,
        justifyContent: 'center',
        backgroundColor: 'white'
      }}
    >
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