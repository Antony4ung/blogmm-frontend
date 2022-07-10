import { Box, MenuItem, Select } from '@mui/material'
import React from 'react'

export default function SelectForm({category,setCategory,all}) {
  return (
    <Box>
        {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
        <Select
            sx={{width: "100%"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            variant='filled'
            onChange={e=>setCategory(e.target.value)}
            size="small"
          >
            {all&&<MenuItem value={"all"}>all</MenuItem>}
            <MenuItem value={"sport"}>Sports</MenuItem>
            <MenuItem value={"health"}>Health</MenuItem>
            <MenuItem value={"education"}>Education</MenuItem>
            <MenuItem value={"love"}>Love</MenuItem>
          </Select>
    </Box>
   
  )
}
