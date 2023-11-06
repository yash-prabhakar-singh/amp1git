import React, { useState } from 'react';
import { Typography, TextField, Chip, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DynamicTextInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [textInputs, setTextInputs] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setTextInputs([...textInputs, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveInput = (index) => {
    const updatedInputs = [...textInputs];
    updatedInputs.splice(index, 1);
    setTextInputs(updatedInputs);
  };

  return (
    <div>
      <Typography variant="h6">Text Inputs</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {textInputs.map((input, index) => (
          <Chip
            key={index}
            label={input}
            onDelete={() => handleRemoveInput(index)}
            deleteIcon={<CloseIcon />}
            color="primary"
          />
        ))}
      </Box>
      <TextField
        label="Add Text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        variant="outlined"
        margin="normal"
      />
    </div>
  );
};

export default DynamicTextInput;
