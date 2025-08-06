import { Route, Routes } from 'react-router-dom'
import { Feed } from '../pages/Feed'
import { Profile } from '../pages/Profile'
import { ProfileEdit } from '../pages/ProfileEdit'
import { CreatePost } from '../pages/CreatePost'
import { Login } from '../pages/Login'
import { SignUp } from '../pages/SignUp'
import { NotfoundPage } from '../pages/NotfoundPage'
import { PrivateRoute } from './PrivateRoute'
import { PreAuthRoute } from './PreAuthRoute'

export const Approutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Feed />} />
      <Route path='/profile/:userName' element={<Profile />} />
      <Route path='/edit-profile' element={<PrivateRoute children={<ProfileEdit />} />} />
      <Route path='/create-post' element={<PrivateRoute children={<CreatePost />} />} />
      <Route path='/auth/login' element={<PreAuthRoute children={<Login />} />} />
      <Route path='/auth/signup' element={<PreAuthRoute children={<SignUp />} />} />
      <Route path='*' element={<NotfoundPage />} />
    </Routes>
  )
}
