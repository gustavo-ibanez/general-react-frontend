import * as React from 'react';
import { TextField } from '@mui/material';

export default function BaseInput({ onChange, value, label, type="string"}) {

  return (
    <TextField  
        variant="standard" 
        label={label}
        type={type}
        value={value} 
        onChange={onChange} 
        style={{ marginRight: '10px' }}/>
  );
}