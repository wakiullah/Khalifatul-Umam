import PostsManager from "@/components/dashboard/PostsManager";
import { getPostsData } from "@/services/posts.api";
import React from "react";

export default async function PostsPage() {
  const { data } = await getPostsData();
  return <PostsManager initialData={data || []} />;
}
