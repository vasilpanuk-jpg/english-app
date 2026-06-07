import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import PublicHome from './components/PublicHome.tsx'
import Grammar from './components/Grammar/Grammar'
import Listening from './components/Listening/Listening'
import Pronunciation from './components/Pronunciation/Pronunciation'
import Reading from './components/Reading/Reading'
import Speaking from './components/Speaking/Speaking'
import Vocabulary from './components/Vocabulary/Vocabulary'
import VocabularySection from './components/Vocabulary/VocabularySection'
import Register from './components/Auth/Register'
import Verify from './components/Auth/Verify'
import Writing from './components/Writing/Writing'
import Profile from './components/Profile/Profile'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Login from './components/Auth/Login'
import ListeningA1 from "./components/Listening/Listening1.tsx" 

export default function App() {
  return (
    <Routes>
      <Route path='/home' element={<PublicHome />} />
      <Route path='/verify' element={<Verify />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/listening/a1" element={<ListeningA1 />} /> 
        <Route path='/profile' element={<Profile />} />
        <Route path='/' element={<Home />} />
        <Route path='/grammar' element={<Grammar />} />
        <Route path='/listening' element={<Listening />} />
        <Route path='/pronunciation' element={<Pronunciation />} />
        <Route path='/reading' element={<Reading />} />
        <Route path='/speaking' element={<Speaking />} />
        <Route path='/vocabulary' element={<Vocabulary />} />
        <Route path='/writing' element={<Writing />} />
        <Route path='/vocabulary/:section' element={<VocabularySection />} />
      </Route>
    </Routes>
  )
}
