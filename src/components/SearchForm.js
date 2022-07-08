import { Box, Button, TextField } from '@mui/material'
import React from 'react'

export default function SearchForm({searchText,setsearchText,filterBlogs}) {
  return (
    <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", my: 5 }}
      >
        <TextField
          style={{ width: "80%", maxWidth: "480px", margin: "0 1rem" }}
          id="outlined-basic"
          label="Search"
          size="small"
          variant="outlined"
          value={searchText}
          onChange={(e) => setsearchText(e.target.value)}
        />
        <Button variant="contained" onClick={()=>filterBlogs()}>
          search
        </Button>
      </Box>
  )
}