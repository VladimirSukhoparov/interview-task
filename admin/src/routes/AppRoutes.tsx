import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
};

