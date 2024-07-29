import { ContentCopy } from '@mui/icons-material'
import { Button, IconButton, Snackbar } from '@mui/material'
import { useState } from 'react'

const CopyToClipboardButton = (param) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        navigator.clipboard.writeText(param.text);
      setOpen(true)
    }
    
    return (
        <>
          <IconButton sx={{paddingTop:0}} size='small' onClick={handleClick}><ContentCopy fontSize='small' /></IconButton>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
        </>
    )
}

export default CopyToClipboardButton