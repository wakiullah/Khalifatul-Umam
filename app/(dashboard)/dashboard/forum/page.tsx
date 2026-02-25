import ForumManager from "@/components/dashboard/ForumManager";
import {
  getAdminForumPosts,
  getAdminForumComments,
  getForumStats,
} from "@/services/admin-forum.api";

export default async function ForumPage() {
  // Fetch data server-side
  const [postsResponse, commentsResponse, stats] = await Promise.all([
    getAdminForumPosts(1, 100), // Get first 100 posts
    getAdminForumComments(),
    getForumStats(),
  ]);

  console.log("Admin Forum Stats:", commentsResponse.data);

  return (
    <ForumManager
      initialPosts={postsResponse.data || []}
      initialComments={commentsResponse.data || []}
      stats={stats.data}
    />
  );
}
