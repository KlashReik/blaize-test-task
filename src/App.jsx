import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  theme,
  Text,
  Flex,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './constants';
import { Accordion, MintForm } from './components';

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [amountValue, setAmountValue] = useState(0);
  const [balance, setBalance] = useState(0);
  const [balanceSymbol, setBalanceSymbol] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  useEffect(() => {
    if (window.ethereum) {
      async function checkConnection() {
        try {
          const accounts = await provider.listAccounts();

          if (accounts.length > 0) {
            console.log('User is connected:', accounts[0]);
            updateInfo(accounts[0]);
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }

      checkConnection();

      window.ethereum.on('accountsChanged', accounts => {
        if (accounts.length === 0) {
          setUserAddress('');
        } else {
          console.log('User switched accounts:', accounts);
        }
      });
    } else {
      console.error('MetaMask not detected');
    }
  }, []);

  const handleInputChange = event => {
    setAmountValue(event.target.value);
  };

  const updateInfo = async account => {
    setUserAddress(account);

    const balance = await contract.balanceOf(account);
    const symbol = await contract.symbol();

    setBalanceSymbol(symbol);
    setBalance(ethers.utils.formatEther(balance));
  };

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        updateInfo(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleMint() {
    const mint = await contract.mint(
      userAddress,
      ethers.utils.parseEther(amountValue)
    );
    await mint.wait();
    const balance = await contract.balanceOf(userAddress);
    setBalance(ethers.utils.formatEther(balance));
  }

  return (
    <ChakraProvider theme={theme}>
      <Box
        textAlign="center"
        fontSize="xl"
        display="flex"
        flexDir="column"
        alignItems="center"
        gap={16}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
      >
        <>
          <Text fontSize="5xl" color="white" pt={100}>
            Get free USDTM tokens from{' '}
            <Text as="span" color="black">
              Blaize
            </Text>
          </Text>
          {userAddress ? (
            <Box
              flexDirection="column"
              backgroundColor="white"
              w="4xl"
              borderWidth="1px"
              borderRadius="lg"
            >
              <Text>Your wallet address: {userAddress}</Text>
              <Flex justifyContent="center">
                <Text>Your balance:</Text>
                <Text as="b">
                  {balance} {balanceSymbol}
                </Text>
              </Flex>
              <MintForm
                onMint={handleMint}
                onChange={handleInputChange}
                inputValue={amountValue}
              />
            </Box>
          ) : (
            <>
              <Button onClick={connectWallet}>Connect to Metamask</Button>
            </>
          )}
        </>
        <Accordion />
      </Box>
    </ChakraProvider>
  );
}

export default App;
