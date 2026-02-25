import { LecturesSection2 } from '@/components/LecturesSection2';
import { getPostsData } from '@/services/posts.api';
import React from 'react'

async function Page() {
    const postresponse = await getPostsData();

      const posts = postresponse?.data || [];

  return (

         <LecturesSection2 posts={posts} />
   
  )
}

export default Page