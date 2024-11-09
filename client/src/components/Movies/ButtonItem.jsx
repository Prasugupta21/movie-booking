import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ButtonItem = ({id}) => {
  return (
    <Button variant='contained' fullWidth LinkComponent={Link} to={`/booking/${id}`} sx={{margin:'auto',bgcolor:'rgb(0 0 0 / 87%)',":hover":{
        bgcolor:'#121217'
    }}} size="small">Book</Button>
  )
}

export default ButtonItem