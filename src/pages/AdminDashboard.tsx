// src/pages/AdminDashboard.tsx
import React from "react";
import { Box, Flex, Heading, Text, Button, SimpleGrid, Avatar, Input, HStack, VStack, Spacer, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEmployees } from "../api/employees";

type EmployeeCard = {
    id: number;
    firstName: string;
    lastName: string;
};

const PAGE_SIZE = 4;

const AdminDashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const { data: employees, isLoading, error } = useEmployees();

    if (!employees) {
        return <Text>Loading...</Text>;
    }
    const [page, setPage] = React.useState(0);
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredEmployees = employees.filter((emp) =>
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Added for pagination
    const start = page * PAGE_SIZE;
    const paginatedEmployees = employees.slice(start, start + PAGE_SIZE);
    const totalPages = Math.ceil(employees.length / PAGE_SIZE);

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
                borderColor="gray.200">
                <Box>
                    <Text fontSize="sm" color="gray.500">
                        Welcome to admin page:
                    </Text>
                    <Text fontWeight="bold">{user ? user.userName : "ukendt bruger"}</Text>
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
                    {/* SEARCH BAR */}
                    <Container mb={6} outline={1}>

                    <Box mb={4}>
                        <Input
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                    </Box>
                    {filteredEmployees.length > 0 && (
                      <SimpleGrid columns={[1, 2, 3]} spacing={4} mb={4}>
                        <Box
                            key={filteredEmployees[0].employeeId}
                            borderWidth="1px"
                            borderRadius="lg"
                            p={2}
                            bg="gray.50"
                            _hover={{ shadow: "md", cursor: "pointer", bg: "gray.100" }}
                            onClick={() => handleEmployeeClick(filteredEmployees[0].employeeId)}>
                            <VStack spacing={3}>
                                <Avatar
                                    name={`${filteredEmployees[0].firstName} ${filteredEmployees[0].lastName}`}
                                    size="xl"
                                    />
                                <Text fontWeight="semibold">
                                    {filteredEmployees[0].firstName} {filteredEmployees[0].lastName}
                                </Text>
                            </VStack>
                        </Box>
                      </SimpleGrid>
                    )}
                    </Container>

                    <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
                        {paginatedEmployees.map((emp) => (
                            <Box
                                key={emp.employeeId}
                                borderWidth="1px"
                                borderRadius="lg"
                                p={4}
                                bg="gray.50"
                                _hover={{ shadow: "md", cursor: "pointer", bg: "gray.100" }}
                                onClick={() => handleEmployeeClick(emp.employeeId)}>
                                <VStack spacing={3}>
                                    <Avatar name={`${emp.firstName} ${emp.lastName}`} size="xl" />
                                    <Text fontWeight="semibold">
                                        {emp.firstName} {emp.lastName}
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                    {/* Pagination knapper */}
                    <HStack justify="center" spacing={4} mt={6}>
                        <Button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
                            Previous
                        </Button>

                        <Text>
                            Page {page + 1} / {totalPages}
                        </Text>

                        <Button onClick={() => setPage((p) => p + 1)} disabled={page + 1 >= totalPages}>
                            Next
                        </Button>
                    </HStack>
                </Box>

                {/* Knapper nederst */}
                <VStack spacing={4} align="stretch" mt={6}>
                    <Button size="lg" colorScheme="orange" onClick={handleCreateEmployee}>
                        Create new employee
                    </Button>
                    <Button size="lg" colorScheme="orange" variant="outline" onClick={handleGenerateShiftplan}>
                        Generate 6 week shiftplan
                    </Button>
                    <Button size="lg" colorScheme="blue" variant="outline" onClick={() => navigate("/employee")}>
                        Gå til employee view (test)
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
