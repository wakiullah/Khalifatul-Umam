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

export default async function Forum() {
  const { data } = await getFormPostsPublicData();
  return (
    <ForumPageContent initialPosts={data || []} categories={forumCategories} />
  );
}
