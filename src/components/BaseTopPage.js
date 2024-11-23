import * as React from 'react';
import { Typography, Alert } from '@mui/material';
import Labels from '../utils/label/en-us';


export default function BaseTopPage({ label, error, successMessage}) {

  return (
      <div>
        <Typography variant="h4" gutterBottom>{label}</Typography>

        {error && <Alert severity="warning">{Labels.message.error.error} {error}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
      </div>
  );
}