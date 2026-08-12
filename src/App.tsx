import * as React from "react"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { store } from "@/app/store"
import { router } from "@/routes/router"

/**
 * App - Root application component.
 * Wraps the centralized RouterProvider inside our global Redux store Provider.
 */
export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}