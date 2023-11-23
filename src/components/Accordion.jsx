import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

const AccordionSection = ({ index }) => (
  <AccordionItem borderRadius="lg" textAlign="left">
    <h2>
      <AccordionButton>
        <Box as="span" flex="1">
          Section {index + 1} title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>
);

export const FAQAccordion = () => {
  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      w="4xl"
      bgColor="whitesmoke"
      borderRadius="lg"
    >
      {Array.from({ length: 15 }).map((__, index) => (
        <AccordionSection index={index} key={index} />
      ))}
    </Accordion>
  );
};
