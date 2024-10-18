import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from 'src/components/Layout';
import { MainPage } from 'src/pages/main';
import { NotFoundPage } from 'src/pages/notFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<MainPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
