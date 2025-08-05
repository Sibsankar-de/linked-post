import { useState } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Header() {
  const [currentPage, setCurrentPage] = useState<string>("");
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="px-10 py-2 w-screen flex items-center justify-between bg-[#ffffffc0] backdrop-blur-2xl">
        <Link to={'/'}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LI</span>
            </div>
            <span className="font-bold text-lg">LinkedClone</span>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link to={'/create-post'}>
            <Button
              variant={currentPage === 'create-post' ? 'none' : 'primary'}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Post
            </Button>
          </Link>

          <Link to={'/profile'}>
            <div className='bg-gray-300 rounded-full overflow-hidden'>
              <Avatar className="w-10 h-10">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback className="text-lg">{"Sibsankar".charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </Link>

        </nav>
      </div>
    </header>
  );
}