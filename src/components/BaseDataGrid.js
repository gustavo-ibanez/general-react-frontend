import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function BaseDataGrid({ rows, columns, rowClassName= () => {}, sxStyle={} }) {
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <DataGrid 
        rows={rows} 
        columns={columns} 
        pageSize={paginationModel.pageSize} 
        rowsPerPageOptions={100}
        disableSelectionOnClick 
        disableColumnFilter
        disableColumnSorting
        getRowClassName = {(params) =>
            params.row.purchased && (params.row.purchased ? 'highlight-row' : '')
      }
    />
  );
}