import { useContext, useEffect, useState } from 'react';
import { PostCard } from '../components/PostCard';
import AuthContext from '../contexts/AuthContext';
import axiosInstance from '../configs/axios-configs';

export function Feed() {
  const [posts, setposts] = useState<Record<string, any>[] | null>(null);
  const { user } = useContext(AuthContext)!;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        await axiosInstance.post('/post/post-list', { userId: user?._id })
          .then(res => {
            setposts(res.data?.data);
          })
      } catch (error) {

      }
    }
    fetchPost();
  }, [])
  return (
    <div className="page-container">
      <div className="text-center mb-10">
        <h1 className="text-xl font-bold mb-2">Latest posts</h1>
        <p className="text-muted-foreground">Stay updated with the latest posts from your network</p>
      </div>

      <div className="space-y-4 px-10">
        {posts?.map(post => (
          <PostCard
            key={post.id}
            data={post}
          />
        ))}
      </div>
    </div>
  );
}