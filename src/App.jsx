import './css/App.css'
import useFetch from './hooks/useFetch'
import Preview from './components/Preview';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Detail from './components/Detail';
import { useEffect, useState } from 'react';

function App() {
  const { data: images, error, isPending } = useFetch("data/imgData.json");
  const [smallScreen, setSmallScreen] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 768px)")
      .addEventListener("change", e => setSmallScreen(e.matches));
  });


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Preview images={images} smallScreen={smallScreen} />
    },
    {
      path: "/detail",
      element: <Detail smallScreen={smallScreen} />
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
