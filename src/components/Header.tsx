import { useContext, useState } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import AuthContext from '../contexts/AuthContext';
import axiosInstance from '../configs/axios-configs';

export function Header() {
  const { user, isAuthenticated } = useContext(AuthContext)!;
  const [isLoading, setIsLoading] = useState(false);
  const handleLogOut = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.get('/user/logout')
        .then(() => {
          window.location.reload();
        })
    } catch (error) {

    }
    setIsLoading(false);
  }
  const navigate = useNavigate();
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="md:px-10 px-5 py-2 w-screen flex items-center justify-between bg-[#ffffffc0] backdrop-blur-2xl">
        <Link to={'/'}>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">LinkedPost</span>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link to={'/create-post'}>
            <Button
              variant={'primary'}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Post
            </Button>
          </Link>

          <Button variant='outline' onClick={() => isAuthenticated ? handleLogOut() : navigate('/auth/login')} disabled={isLoading}>
            {isAuthenticated ? <span className='text-red-400'>Logout</span>
              : <span className='text-blue-400'>Sign in</span>
            }
          </Button>

          {isAuthenticated && <Link to={`/profile/${user?.userName}`}>
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar} alt={user?.userName} />
              <AvatarFallback className="text-lg">{user?.fullName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>}

        </nav>
      </div>
    </header>
  );
}