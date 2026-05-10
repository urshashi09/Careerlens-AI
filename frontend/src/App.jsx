import { RouterProvider } from "react-router"
import {router} from './app.routes.jsx'
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { ReportProvider } from "./features/report/report.context.jsx"

function App() {
  
  return (
    <AuthProvider>
      <ReportProvider>
        <RouterProvider router={router} />
      </ReportProvider>
    </AuthProvider>
  )
}

export default App
