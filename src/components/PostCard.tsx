import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Heart, Bookmark, Share2, MoreHorizontal } from 'lucide-react';

interface PostCardProps {
  post: Record<string, any>
}

const mockUsers = {
  '1': { name: 'John Doe', title: 'Software Engineer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  '2': { name: 'Sarah Wilson', title: 'Product Manager', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
  '3': { name: 'Mike Chen', title: 'Tech Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }
};

export function PostCard({ post }: PostCardProps) {
  const user = mockUsers[post.userId as keyof typeof mockUsers];
  const timeAgo = getTimeAgo(post.timestamp);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.title}</p>
              <p className="text-xs text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm leading-relaxed mb-4">{post.content}</p>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              // onClick={() => onLike(post.id)}
              className={`flex items-center gap-2 ${post.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{post.likes}</span>
            </Button>

            <Button
              variant="outline"
              // onClick={() => onSave(post.id)}
              className={`flex items-center gap-2 ${post.isSaved ? 'text-blue-500' : 'text-muted-foreground'}`}
            >
              <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-current' : ''}`} />
              <span className="text-xs">Save</span>
            </Button>

            <Button
              variant="outline"
              // onClick={() => onShare(post.id)}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-xs">{post.shares}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getTimeAgo(timestamp: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}