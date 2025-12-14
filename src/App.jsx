
import './App.css'
import Head from './components/head'
import Body from "./components/body"
import { Provider } from 'react-redux'
import store from './utils/store'
import { createBrowserRouter } from 'react-router-dom'
import Watch from './components/Watch'
import AppLayout from './components/AppLayout'
import Home from './components/Home'
import { RouterProvider } from 'react-router'

function App() {

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "watch", element: <Watch /> }
      ]
    }
    // you can add more routes here
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}


export default App
