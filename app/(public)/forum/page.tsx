import ForumPageContent from "@/components/forum/ForumPageContent";
import { getFormPostsPublicData } from "@/services/forum.api";

const forumCategories = [
  "All",
  "General",
  "ইবাদত",
  "আকিদা",
  "সমাজ",
  "অন্যান্য",
];

interface ForumPageProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function Forum({ searchParams }: ForumPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const limit = parseInt(params.limit || "10", 3);

  const response = await getFormPostsPublicData(page, limit);

  return (
    <ForumPageContent
      initialPosts={response.data || []}
      categories={forumCategories}
      pagination={response.pagination}
    />
  );
}
