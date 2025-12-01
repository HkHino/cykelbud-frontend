// src/pages/EmployeeOverviewPage.tsx
import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Avatar,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEmployee } from "../api/employees";

const EmployeeOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const employeeId = Number(id);
  const { data: employee, isLoading, error } = useEmployee(employeeId);

  const handleBack = () => {
    navigate("/admin");
  };

  const handleUpdate = () => {
    // senere: navigate til rigtig edit-side
    alert("Update employee – UI kommer senere 🙂");
  };

  const handleDelete = () => {
    // senere: rigtig delete + bekræftelses-popup
    alert("Delete employee – confirmation UI kommer senere 🙂");
  };

  if (isLoading) {
    return (
      <Box p={8}>
        <Text>Loading employee...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8}>
        <Text color="red.500">
          Kunne ikke hente employee fra API: {(error as Error).message}
        </Text>
        <Button mt={4} onClick={() => navigate("/admin")}>
          ← Tilbage
        </Button>
      </Box>
    );
  }

  if (!employee) {
    return (
      <Box p={8}>
        <Button mb={4} onClick={() => navigate("/admin")}>
          ← Tilbage
        </Button>
        <Text>Employee med id {id} blev ikke fundet.</Text>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.100" p={8}>
      <Flex justify="space-between" mb={6}>
        <Heading size="lg">Employee edit/overview</Heading>
        <Button variant="outline" onClick={handleBack}>
          Previous page
        </Button>
      </Flex>

      <Flex gap={8}>
        {/* Stats placeholder til venstre */}
        <Box
          flexBasis="200px"
          bg="white"
          p={4}
          rounded="lg"
          shadow="sm"
          minH="200px"
        >
          <Heading size="sm" mb={2}>
            Stats
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Her kan vi senere vise timer, ruter osv.
          </Text>
        </Box>

        {/* Billede og knapper */}
        <Stack direction={["column", "row"]} spacing={8} flex="1">
          <Box
            bg="white"
            p={6}
            rounded="lg"
            shadow="sm"
            display="flex"
            alignItems="center"
            justifyContent="center"
            minW="260px"
          >
            <VStack spacing={3}>
              <Avatar
                name={`${employee.firstName} ${employee.lastName}`}
                size="2xl"
              />
              <Text fontWeight="bold">
                {employee.firstName} {employee.lastName}
              </Text>
            </VStack>
          </Box>

          <VStack align="flex-start" spacing={4}>
            <Button colorScheme="orange" onClick={handleUpdate}>
              Update employee
            </Button>
            <Button variant="outline" colorScheme="red" onClick={handleDelete}>
              Delete employee
            </Button>
          </VStack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default EmployeeOverviewPage;
