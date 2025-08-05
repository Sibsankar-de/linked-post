import { PostCard } from '../components/PostCard';

export function Feed() {
  const mockPosts: Record<string, any>[] = [
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
    {
      id: '3',
      userId: '3',
      content: 'Reflecting on the importance of mentorship in career growth. I\'ve been fortunate to have great mentors, and now I\'m passionate about paying it forward. If you\'re early in your career and looking for guidance, feel free to reach out!',
      timestamp: new Date('2024-08-04T16:45:00'),
      likes: 89,
      isLiked: false,
      isSaved: false,
      shares: 7
    }
  ];
  return (
    <div className="page-container">
      <div className="text-center mb-10">
        <h1 className="text-xl font-bold mb-2">Latest For you</h1>
        <p className="text-muted-foreground">Stay updated with the latest posts from your network</p>
      </div>

      <div className="space-y-4 px-10">
        {mockPosts.map(post => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
}