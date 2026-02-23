import UsersManager from "@/components/dashboard/UsersManager";
import { getUsers } from "@/services/users.api";
import React from "react";

export default async function UsersPage() {
  const usersData = await getUsers();
  return <UsersManager initialData={usersData} />;
}
