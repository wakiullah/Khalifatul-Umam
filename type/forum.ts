export interface ForumPostData {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  views: number;
  status: string;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  likeCount: number;
  unlikeCount: number;
  userReaction: "like" | "unlike" | null;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

export interface ForumPostListResponse {
  success: boolean;
  count: number;
  pagination: Pagination;
  data: ForumPostData[];
}

export interface ForumPostResponse {
  success: boolean;
  data: ForumPostData;
}

export interface CreateForumPostRequest {
  title: string;
  content: string;
  author: string;
  category: string;
}

export interface ForumCommentData {
  _id: string;
  postId: string;
  content: string;
  author: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ForumCommentListResponse {
  success: boolean;
  count: number;
  data: ForumCommentData[];
}

export interface ForumCommentResponse {
  success: boolean;
  data: ForumCommentData;
}
