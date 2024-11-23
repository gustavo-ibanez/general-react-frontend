import * as React from 'react';
import { NativeSelect, FormControl, InputLabel } from '@mui/material';

export default function BaseSelect({ onChange, disabled = false, value, label, itens, array}) {

  return (
    <FormControl fullWidth style={{ margin: '10px 0' }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
            {label}
        </InputLabel>
        <NativeSelect
            defaultValue=""
            value={value}
            disabled={disabled}
            onChange={onChange}>
            <option value=""></option> 
            {itens && itens.map((item) => (
                <option key={item._id} value={item._id}>
                    {item.name}
                </option>
            ))}
            {array && array.map(([code, description]) => (
                        <option key={code} value={code}>
                            {code} - {description}
                        </option>
                    ))}
        </NativeSelect>
    </FormControl>
  );
}