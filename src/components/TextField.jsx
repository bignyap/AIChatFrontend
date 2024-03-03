import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultiLineTextField() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
            id="outlined-multiline-static"
            label="Ask your question"
            multiline
            fullWidth
            defaultValue=""
        />
    </Box>
  );
}