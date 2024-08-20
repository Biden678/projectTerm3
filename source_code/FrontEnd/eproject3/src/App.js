import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { publicRouter } from './router/ListRouter';
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    // container-fluid
    <div className="">
      <Routes>
        {publicRouter.map((route, index) => (
          // console.log('route.path', route.path),
          // console.log('route.component', route.component),
          <Route key={index} path={route.path} element={route.component} />
        ))
        }


      </Routes>
      <ToastContainer/>

    </div>
  );
}

export default App;
