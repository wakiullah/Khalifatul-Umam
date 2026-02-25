import MemberApplicationsManager from "@/components/dashboard/MemberApplicationsManager";
import { getAllMembers } from "@/services/members.api";

export default async function MemberApplicationsPage() {
  const membersResponse = await getAllMembers();
  const members = membersResponse.data || [];
  const meta = membersResponse.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  return <MemberApplicationsManager initialData={members} meta={meta} />;
}
