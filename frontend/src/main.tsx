import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SquadPage } from './pages/squads/squads.page.tsx'
import { UsersPage } from './pages/users/users.page.tsx'
import { SquadDetails } from './pages/squadDetails/index.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SquadPage/>
  },
  {
    path: "/users",
    element: <UsersPage/>
  },
  {
    path: "/squad/:squadId",
    element: <SquadDetails/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
