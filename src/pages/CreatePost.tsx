import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import axiosInstance from '../configs/axios-configs';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { Trash } from 'lucide-react';

export function CreatePost() {
  const [content, setContent] = useState<string | null>('');
  const [isPosting, setIsPosting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [postData, setPostData] = useState<Record<string, any> | null>(null);
  const { user } = useContext(AuthContext)!;

  const navigate = useNavigate();
  const [queries] = useSearchParams();
  const mode = queries.get('mode');
  const postId = queries.get('id');

  const fetchPost = async () => {
    try {
      await axiosInstance.get(`/post/${postId}`)
        .then(res => {
          const data = res.data?.data;
          setPostData(data);
        })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status as number;
        if (status >= 400 && status < 500) toast.error(error.response?.data.message);
      } else {
        toast.error("Login failed! Please try again")
      }
    }
  }
  useEffect(() => {
    if (mode === 'edit' && !postId)
      navigate('/*');
    else if (mode === 'edit') {
      setIsEdit(true);
      fetchPost();
    }
  }, [mode, postId]);

  useEffect(() => {
    if (postData) {
      setContent(postData?.content?.text);
    }
  }, [postData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content?.trim()) return;

    setIsPosting(true);

    try {
      if (isEdit) {
        axiosInstance.post(`/post/update`, { postId, content: { text: content } })
          .then(() => {
            toast.success("Post saved successfully");
            navigate(-1);
          })
      }
      else {
        await axiosInstance.post("/post/create", { content: { text: content } })
          .then(() => {
            toast.success("Post created successfully");
            navigate(-1);
          })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status as number;
        if (status >= 400 && status < 500) toast.error(error.response?.data.message);
      } else {
        toast.error("Post create failed! Please try again")
      }
    }
    setIsPosting(false);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.post('/post/delete', { postId })
        .then(() => {
          navigate(-1);
        })
    } catch (error) {
      toast.error("Unable to delete this post")
    }
  }

  const characterCount = content?.length;
  const maxCharacters = 3000;
  const isNearLimit = characterCount && characterCount > maxCharacters * 0.8;

  return (
    <div className="page-container">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className='font-semibold text-lg'>Create a Post</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={user?.avatar} alt="Your avatar" />
                <AvatarFallback>{user?.fullName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <Textarea
                  value={content || ""}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind? Share your thoughts, insights, or updates with your network..."
                  className="min-h-32 resize-none border-0 bg-transparent p-0 focus:ring-0 text-base"
                  maxLength={maxCharacters}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                <span className={isNearLimit ? 'text-orange-500' : ''}>
                  {characterCount}
                </span>
                <span className="text-muted-foreground">/{maxCharacters}</span>
              </div>

              <div className="flex gap-2">
                {isEdit && <Button variant='outline' className='border-red-400!' onClick={handleDelete}>
                  <span><Trash size={15} /></span>
                  <span className='text-red-400'>Delete post</span>
                </Button>}
                <Button
                  disabled={!content?.trim() || (characterCount && characterCount > maxCharacters) || isPosting}
                  onClick={handleSubmit}
                >
                  {isEdit ?
                    isPosting ? 'Saving...' : 'Save changes'
                    :
                    isPosting ? 'uploading...' : 'Share post'
                  }
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Tips for great posts:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Share insights from your professional experience</li>
              <li>• Ask thoughtful questions to engage your network</li>
              <li>• Celebrate achievements and milestones</li>
              <li>• Share helpful resources or articles</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}