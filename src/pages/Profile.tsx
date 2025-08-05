import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Forward, UserPlus } from 'lucide-react';
import { PostCard } from '../components/PostCard';

export function Profile() {
  const user: Record<string, any> = {
    id: '1',
    name: 'John Doe',
    title: 'Software Engineer',
    company: 'Tech Corp',
    bio: 'Passionate about building great software and helping teams succeed. Always learning and growing.',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  };
  const posts = [
    {
      id: '1',
      userId: '1',
      content: 'Excited to share that I just completed a major project at work! The team worked incredibly hard to deliver this on time. Grateful for such amazing colleagues who make challenging work feel rewarding.',
      timestamp: new Date('2024-08-05T10:30:00'),
      likes: 24,
      isLiked: false,
      isSaved: false,
      shares: 3
    },
    {
      id: '2',
      userId: '2',
      content: 'Just attended an amazing tech conference. The keynote on AI and the future of work was particularly insightful. Key takeaway: adaptability and continuous learning will be more important than ever.',
      timestamp: new Date('2024-08-05T08:15:00'),
      likes: 56,
      isLiked: true,
      isSaved: true,
      shares: 12
    },
  ];
  return (
    <div className="page-container">
      <div className='mb-5'>
        <div className="p-5 flex items-center gap-5">
          <Avatar className="w-50 h-50">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground mb-2">@{user.title}</p>
            <div className="flex items-center gap-3 mb-2">
              <div className='py-1.5 px-3 border rounded-2xl'>
                <span>30 posts</span>
              </div>
              <div className='py-1.5 px-3 border rounded-2xl'>
                <span className='text-blue-400'>300 followers</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant='primary'>
                <span ><UserPlus size={15} /></span>
                <span>Connect</span>
              </Button>
              <Button variant='outline'>
                <span><Forward size={20} /></span>
              </Button>
            </div>
          </div>
        </div>

      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Posts</h2>
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
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