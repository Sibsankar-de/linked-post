import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Forward, UserPlus, UserRoundPen, UserCheck, StickyNote, Bookmark } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../configs/axios-configs';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import clsx from 'clsx';

export function Profile() {
  const { user, isAuthenticated } = useContext(AuthContext)!;
  const [currentUser, setCurrentUser] = useState<Record<string, any> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) navigate('/*')
    const fetchUser = async () => {
      try {
        await axiosInstance.get(`/user/get-by-name/${userName}`)
          .then(res => {
            setCurrentUser(res.data?.data);
          })
      } catch (error) {
        navigate('/*')
      }
    }

    if (userName) fetchUser();
  }, [userName]);

  // check connect
  useEffect(() => {
    const fetchConnect = async () => {
      try {
        await axiosInstance.get(`/user/check-follow/${currentUser?._id}`)
          .then(res => {
            const isFollowed = res.data?.data?.isFollowed;
            setIsConnected(isFollowed);
          })
      } catch (error) {

      }
    }
    if (currentUser) {
      fetchConnect();
    }
  }, [currentUser]);

  // handle connect
  const handleConnect = async () => {
    setIsLoading(true)
    try {
      if (!isConnected) {
        await axiosInstance.post(`/user/create-follow`, { followingTo: currentUser?._id })
          .then(() => {
            setIsConnected(true)
          })
      } else {
        await axiosInstance.post(`/user/remove-follow`, { followingTo: currentUser?._id })
          .then(() => {
            setIsConnected(false)
          })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status as number;
        if (status === 401) navigate('/auth/login');
        else if (status >= 400 && status < 500) toast.error(error.response?.data.message);
      } else {
        toast.error("Connection failed! Please try again");
      }
    }
    setIsLoading(false);
  }

  const [activeTab, setActiveTab] = useState<string>("post");
  const [userPosts, setUserPosts] = useState<Record<string, any>[] | null>(null);
  const [savedPosts, setSavedPosts] = useState<Record<string, any>[] | null>(null);
  const [renderList, setRenderList] = useState<Record<string, any>[] | null>(userPosts);

  const fetchUserPosts = async () => {
    try {
      await axiosInstance.post(`/post/user-posts`, { userId: currentUser?._id, authUserId: user?._id })
        .then(res => {
          setUserPosts(res.data?.data);
        })
    } catch (error) {
      toast.error("Failed to fetch list");
    }
  };

  const fetchSavedPosts = async () => {
    if (!isAuthenticated) return;

    try {
      await axiosInstance.post(`/post/get-saved-post`)
        .then(res => {
          setSavedPosts(res.data?.data);
        })
    } catch (error) {
      toast.error("Failed to fetch list");
    }
  };


  useEffect(() => {
    if (currentUser) {
      fetchUserPosts();
      fetchSavedPosts();
    }
  }, [currentUser, user, activeTab]);

  useEffect(() => {
    if (activeTab === 'saved') setRenderList(savedPosts);
    else setRenderList(userPosts);
  }, [activeTab, savedPosts, userPosts]);

  return (
    <div className="page-container">
      <div className='mb-5'>
        <div className="p-5 flex items-center gap-5">
          <Avatar className="w-50 h-50">
            <AvatarImage src={currentUser?.avatar} alt={currentUser?.fullName} />
            <AvatarFallback className="text-[5em]">{currentUser?.fullName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">{currentUser?.fullName}</h1>
            <p className="text-muted-foreground mb-2">@{currentUser?.userName}</p>
            <div className="flex items-center gap-3 mb-2">
              <div className='py-1.5 px-3 border rounded-2xl'>
                <span>{currentUser?.postCount} posts</span>
              </div>
              <div className='py-1.5 px-3 border rounded-2xl'>
                <span className='text-blue-400'>{currentUser?.connectCount} Connections</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {currentUser?.userName === user?.userName ?
                <Button variant='primary' disabled={isLoading}>
                  <span ><UserRoundPen size={15} /></span>
                  <span>Edit profile</span>
                </Button>
                :
                <Button variant={isConnected ? 'outline' : 'primary'} disabled={isLoading} onClick={handleConnect}>
                  <span >{isConnected ? <UserCheck size={15} /> : <UserPlus size={15} />}</span>
                  <span>{isConnected ? "Connected" : 'Connect'}</span>
                </Button>
              }
              <Button variant='outline'>
                <span><Forward size={20} /></span>
              </Button>
            </div>
          </div>
        </div>

      </div>

      <div className="space-y-4">
        <div className={clsx('p-1 bg-gray-300 w-full md:w-[60%] rounded-2xl', (currentUser?._id === user?._id) ? 'grid grid-cols-2' : 'grid grid-cols-1')}>
          <Button variant='none' className={clsx(activeTab === 'post' && 'bg-gray-100')} onClick={() => setActiveTab('post')}>
            <span><StickyNote size={15} /></span>
            <span>My posts</span>
          </Button>
          {(currentUser?._id === user?._id) && <Button variant='none' className={clsx(activeTab === 'saved' && 'bg-gray-100')} onClick={() => setActiveTab('saved')}>
            <span><Bookmark size={15} /></span>
            <span>Saved posts</span>
          </Button>}
        </div>

        {renderList && renderList?.length > 0 ? (
          renderList?.map(post => (
            <PostCard
              key={post._id}
              data={post}
            />
          ))
        ) : (
          <Card className="w-full">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">No posts yet</p>
                <Button>Create your first post</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}