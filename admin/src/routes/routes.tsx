import { Dashboard } from '../pages/Dashboard';
import { Finalize } from '../pages/Finalize';
import { Results } from '../pages/Results';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/results/:testId',
    element: <Results />,
  },
  {
    path: '/finalize/:testId',
    element: <Finalize />,
  },
];

export default routes;
