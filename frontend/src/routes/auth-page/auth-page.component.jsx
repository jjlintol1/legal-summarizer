import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignInPage from '../sign-in-page/sign-in-page.component'
import SignUpPage from '../sign-up-page/sign-up-page.component'

const AuthPage = () => {
  return (
    <Routes>
        <Route index element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
  )
}

export default AuthPage