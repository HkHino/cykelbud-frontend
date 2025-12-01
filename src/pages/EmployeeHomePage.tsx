// src/pages/EmployeeHomePage.tsx
import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  Badge,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Midlertidige dummy-vagter – senere henter vi dem fra dit shifts-endpoint
type ShiftItem = {
  id: number;
  date: string;
  routeNumber: number;
  startTime: string | null;
  endTime: string | null;
};

const mockShifts: ShiftItem[] = [
  {
    id: 1,
    date: "2025-12-01",
    routeNumber: 101,
    startTime: "08:00",
    endTime: "12:00",
  },
  {
    id: 2,
    date: "2025-12-03",
    routeNumber: 103,
    startTime: null,
    endTime: null,
  },
  {
    id: 3,
    date: "2025-12-05",
    routeNumber: 105,
    startTime: "09:00",
    endTime: "13:00",
  },
];

const EmployeeHomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleGoToAdmin = () => {
    navigate("/admin");
  };

  return (
    <Box minH="100vh" bg="gray.100" p={8}>
      {/* Topbar */}
      <Flex mb={6} align="center">
        <Box>
          <Text fontSize="sm" color="gray.500">
            Logged in as:
          </Text>
          <Text fontWeight="bold">
            {user ? user.userName : "ukendt bruger"}
          </Text>
        </Box>
        <Spacer />
        <HStack spacing={3}>
          {/* Dev-knap – kan fjernes senere */}
          <Button variant="outline" onClick={handleGoToAdmin}>
            Go to admin (dev)
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      </Flex>

      {/* Hovedindhold */}
      <Stack direction={["column", "row"]} spacing={8} align="flex-start">
        {/* Venstre: introduktion */}
        <Box bg="white" p={6} rounded="lg" shadow="sm" flex="1">
          <Heading size="lg" mb={2}>
            Welcome{user ? `, ${user.userName}` : ""} 👋
          </Heading>
          <Text color="gray.600">
            Her kan du se dine kommende vagter, rutenumre og tider. Senere kan vi
            også vise total timer, statistik og mulighed for at bytte vagter.
          </Text>
        </Box>

        {/* Højre: kommende vagter */}
        <Box
          bg="white"
          p={6}
          rounded="lg"
          shadow="sm"
          flex="1"
          minW={["100%", "320px"]}
        >
          <Heading size="md" mb={4}>
            Upcoming shifts
          </Heading>

          <VStack align="stretch" spacing={3}>
            {mockShifts.map((shift) => (
              <Box
                key={shift.id}
                borderWidth="1px"
                borderRadius="md"
                p={3}
                bg="gray.50"
              >
                <HStack justify="space-between">
                  <Box>
                    <Text fontWeight="semibold">{shift.date}</Text>
                    <Text fontSize="sm" color="gray.600">
                      Route {shift.routeNumber}
                    </Text>
                  </Box>
                  <VStack spacing={1} align="flex-end">
                    {shift.startTime && shift.endTime ? (
                      <Text fontSize="sm">
                        {shift.startTime} – {shift.endTime}
                      </Text>
                    ) : (
                      <Badge colorScheme="yellow">Time not set</Badge>
                    )}
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </Stack>
    </Box>
  );
};

export default EmployeeHomePage;
