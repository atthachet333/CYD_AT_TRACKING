import type { Role } from "../types";

export interface DemoCredential {
  username: string;
  password: string;
  role: Role;
  description: string;
}

export function getDemoCredentials(): DemoCredential[] {
  return [
    {
      username: "admin",
      password: "admin1234",
      role: "admin",
      description: "Administrator demo account",
    },
    {
      username: "teecyd",
      password: "1234",
      role: "user",
      description: "General user demo account",
    },
    {
      username: "newcyd",
      password: "cyd42",
      role: "user",
      description: "General user demo account",
    },
  ];
}
