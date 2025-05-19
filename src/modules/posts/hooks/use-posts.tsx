import { useEffect, useState } from "react";
import { IPostWithAuthor } from "../types";
import { postsService } from "../services";

export function usePosts() {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<IPostWithAuthor[]>([])
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const posts = await postsService.listPosts()
        setPosts(posts)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])
  return { posts, isLoading }
}
