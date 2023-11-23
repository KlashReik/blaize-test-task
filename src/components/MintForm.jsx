import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react';

export const MintForm = ({ onMint, onChange, inputValue }) => {
  return (
    <Box display="flex" gap={8} padding={8}>
      <Input
        placeholder="Enter amount of tokens"
        value={inputValue}
        onChange={onChange}
      />
      <Button onClick={onMint} w="xl" fontSize="xl">
        Send me USDTM
      </Button>
    </Box>
  );
};
