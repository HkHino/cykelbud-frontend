  // src/pages/AdminDashboard.tsx
  import React from "react";
  import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    SimpleGrid,
    Avatar,
    VStack,
    Spacer,
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";
  import { useEmployees } from "../api/employees";


  type EmployeeCard = {
    id: number;
    firstName: string;
    lastName: string;
  };

  const AdminDashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const { data: employees, isLoading, error } = useEmployees();


    const handleEmployeeClick = (id: number) => {
      navigate(`/admin/employees/${id}`);
    };

    const handleGenerateShiftplan = () => {
      navigate("/admin/shiftplan");
    };

    const handleCreateEmployee = () => {
      alert("Create new employee – kommer senere 🙂");
    };

    return (
      <Box minH="100vh" bg="gray.100">
        {/* Topbar */}
        <Flex
          as="header"
          bg="white"
          px={8}
          py={4}
          align="center"
          shadow="sm"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Box>
            <Text fontSize="sm" color="gray.500">
              Welcome to admin page:
            </Text>
            <Text fontWeight="bold">
              {user ? user.userName : "ukendt bruger"}
            </Text>
          </Box>

          <Spacer />

          <Heading size="md">LOGO</Heading>

          <Spacer />

          <Button variant="outline" onClick={logout}>
            Exit
          </Button>
        </Flex>

        {/* Indhold */}
        <Box px={8} py={6}>
          {/* Employee overview */}
          <Box bg="white" p={6} rounded="lg" shadow="sm" mb={6}>
            <Heading size="md" mb={4}>
              Employee overview
            </Heading>

        {isLoading && <Text>Loading employees...</Text>}
  {error && (
    <Text color="red.500" mb={2}>
      Kunne ikke hente employees fra API: {(error as Error).message}
    </Text>
  )}

  <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
    {(employees ?? []).map((emp) => (
      <Box
        key={emp.employeeId}
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        bg="gray.50"
        _hover={{ shadow: "md", cursor: "pointer", bg: "gray.100" }}
        onClick={() => handleEmployeeClick(emp.employeeId)}
      >
        <VStack spacing={3}>
          <Avatar
            name={`${emp.firstName} ${emp.lastName}`}
            size="xl"
          />
          <Text fontWeight="semibold">
            {emp.firstName} {emp.lastName}
          </Text>
        </VStack>
      </Box>
    ))}
  </SimpleGrid>

          </Box>

          {/* Knapper nederst */}
          <VStack spacing={4} align="stretch" mt={6}>
            <Button size="lg" colorScheme="orange" onClick={handleCreateEmployee}>
              Create new employee
            </Button>
            <Button
              size="lg"
              colorScheme="orange"
              variant="outline"
              onClick={handleGenerateShiftplan}
            >
              Generate 6 week shiftplan
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  };

  export default AdminDashboard;
