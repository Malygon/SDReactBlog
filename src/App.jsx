import './css/App.css'
import useFetch from './hooks/useFetch'
import Preview from './components/Preview';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Detail from './components/Detail';

function App() {
  const { data: images, error, isPending } = useFetch("data/imgData.json");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Preview images={images} />
    },
    {
      path: "/detail",
      element: <Detail />
    }
  ]);

  return (
    <>
      {error && <p>Error loading images: {error}</p>}
      {isPending && <p>Loading images....</p>}
      <div className='body'>
        {images && < RouterProvider router={router} />}
      </div>
    </>
  )
}

export default App
