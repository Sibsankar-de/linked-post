import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Heart, Bookmark, Share2, Dot, PencilLine } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import axiosInstance from '../configs/axios-configs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

interface PostCardProps {
  data: Record<any, any>
}

export function PostCard({ data }: PostCardProps) {
  const [post, setPost] = useState<Record<any, any> | null>(null);
  const [postUser, setPostUser] = useState<Record<any, any> | null>(null);
  const timeAgo = getTimeAgo(post?.createdAt);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const { user } = useContext(AuthContext)!;

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setPost(data);
      setPostUser(data?.postCreator[0]);
      setIsLiked(post?.isLiked);
      setIsSaved(post?.isSaved);
      setLikeCount(post?.totalLikes);
    }
  }, [post]);

  const handleLike = async () => {
    try {
      let endpoint = 'create-like';
      if (isLiked) endpoint = 'remove-like';
      await axiosInstance.post(`/post/${endpoint}`, { postId: data?._id })
        .then(() => {
          setIsLiked(!isLiked);
          if (isLiked) setLikeCount(prev => prev - 1);
          else setLikeCount(prev => prev + 1);
        })

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status as number;
        if (status === 401) navigate('/auth/login');
        if (status >= 400 && status < 500) toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  const handleSave = async () => {
    try {
      let endpoint = 'create-save';
      if (isSaved) endpoint = 'remove-save';
      await axiosInstance.post(`/post/${endpoint}/${data?._id}`)
        .then(() => {
          setIsSaved(!isSaved);
        })

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status as number;
        if (status === 401) navigate('/auth/login');
        if (status >= 400 && status < 500) toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong")
      }
    }
  }


  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={postUser?.avatar} alt={postUser?.name} />
              <AvatarFallback>{postUser?.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className='flex items-center gap-3'>
              <div>
                <h3 className="font-semibold">{postUser?.fullName}</h3>
                <p className="text-sm text-muted-foreground">@{postUser?.userName}</p>
              </div>
              <Dot />
              <div>
                <p className="text-xs text-muted-foreground">{timeAgo}</p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm leading-relaxed mb-4">{post?.content?.text}</p>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleLike}
              className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{likeCount}</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleSave}
              className={`flex items-center gap-2 ${isSaved ? 'text-blue-500' : 'text-muted-foreground'}`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span className="text-xs">Save</span>
            </Button>

            <Button
              variant="outline"
              // onClick={() => onShare(post.id)}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
          {(user?._id === postUser?._id) && <div>
            <Button variant='primary' onClick={() => navigate(`/create-post?mode=edit&id=${post?._id}`)}>
              <span><PencilLine className='w-4 h-4' /></span>
              <span>Edit post</span>
            </Button>
          </div>}
        </div>
      </CardContent>
    </Card>
  );
}

function getTimeAgo(createdAt: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - new Date(createdAt).getTime()) / 1000);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${minutes}m ago`;
  if (seconds < 86400) return `${hours}h ago`;
  return `${days}d ago`;
}