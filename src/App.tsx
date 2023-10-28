import { Flip, ToastContainer } from 'react-toastify'

import { Router } from '@/router'
import 'react-toastify/dist/ReactToastify.css'
export function App() {
  return (
    <>
      <Router />
      <ToastContainer
        transition={Flip}
        theme="colored"
        hideProgressBar
        newestOnTop
        autoClose={3000}
        position={'bottom-center'}
      />
    </>
  )
}
