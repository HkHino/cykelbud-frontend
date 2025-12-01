// src/api/employees.ts
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "./client";
import { useAuth } from "../context/AuthContext";

// Tilpas denne til din EmployeeDto fra backend
export interface EmployeeDto {
  employeeId: number;
  firstName: string;
  lastName: string;
  // tilføj flere felter hvis du vil bruge dem senere
}

// Antagelse: dit backend endpoint hedder /api/employees
// og returnerer en liste af EmployeeDto
export function useEmployees() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["employees"],
    queryFn: () => apiGet<EmployeeDto[]>("/api/employees", token || undefined),
  });
}

// Antagelse: GET /api/employees/{id}
export function useEmployee(id: number) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => apiGet<EmployeeDto>(`/api/employees/${id}`, token || undefined),
    enabled: !!id,
  });
}
