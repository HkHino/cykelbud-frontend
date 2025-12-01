// src/pages/ShiftplanPage.tsx
import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ShiftplanPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin");
  };

  return (
    <Box minH="100vh" bg="gray.100" p={8}>
      <Flex mb={6} align="center">
        <Heading size="lg">Auto generated shiftplan</Heading>
        <Spacer />
        <Button variant="outline" onClick={handleBack}>
          Previous page
        </Button>
      </Flex>

      <Flex gap={8}>
        {/* Venstre: liste/scroll placeholder */}
        <Box
          flex="1"
          bg="white"
          p={4}
          rounded="lg"
          shadow="sm"
          minH="300px"
        >
          <Text mb={2} fontWeight="bold">
            (Her kommer listen med skift: navn + rute)
          </Text>
          <Text fontSize="sm" color="gray.500">
            Vi bygger den rigtige tabel, når backend-endpoints til shifts er
            klar.
          </Text>
        </Box>

        {/* Højre: knapper */}
        <VStack spacing={4} align="stretch" minW="260px">
          <Button colorScheme="orange">Generate new shiftplan</Button>
          <Button variant="outline" colorScheme="orange">
            Export shiftplan
          </Button>
          <Button variant="outline">Manually edit shiftplan</Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ShiftplanPage;
