import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsPosting(true);

    // Simulate posting delay
    setTimeout(() => {
      // onPost(content.trim());
      setContent('');
      setIsPosting(false);
    }, 1000);
  };

  const characterCount = content.length;
  const maxCharacters = 3000;
  const isNearLimit = characterCount > maxCharacters * 0.8;

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
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Your avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <Textarea
                  value={content}
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
                <Button
                  disabled={!content.trim() || characterCount > maxCharacters || isPosting}
                >
                  {isPosting ? 'uploading...' : 'Share post'}
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