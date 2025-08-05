import { Route, Routes } from 'react-router-dom'
import { Feed } from '../pages/Feed'
import { Profile } from '../pages/Profile'
import { ProfileEdit } from '../pages/ProfileEdit'
import { CreatePost } from '../pages/CreatePost'
import { Login } from '../pages/Login'
import { SignUp } from '../pages/SignUp'

export const Approutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Feed />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/edit-profile' element={<ProfileEdit />} />
      <Route path='/create-post' element={<CreatePost />} />
      <Route path='/auth/login' element={<Login />} />
      <Route path='/auth/signup' element={<SignUp />} />
    </Routes>
  )
}
