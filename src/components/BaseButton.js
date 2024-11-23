import * as React from 'react';
import { Button } from '@mui/material';

export default function BaseButton({ onClick, label}) {

  return (
    <Button sx={{ marginTop: '20px', marginLeft: '20px'}}
          button="true"
          variant="contained" 
          color="primary" 
          onClick={onClick}>
          {label}
      </Button>
  );
}