import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultiLineTextField(props) {
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
            fullWidth 
            label={props.label}
            id={props.id}
            placeholder={props.placeholder}
            value= {props.value}
            onChange= {props.onChange}
            rows={props.rows}
            maxRows={props.maxRows}
            multiline
        />
    </Box>
  );
}