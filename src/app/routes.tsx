import { createBrowserRouter } from 'react-router';
import { Login } from '@/app/pages/Login';
import { Register } from '@/app/pages/Register';
import { ClientDashboard } from '@/app/pages/ClientDashboard';
import { VideoReview } from '@/app/pages/VideoReview';
import { AdminDashboard } from '@/app/pages/AdminDashboard';
import { NotFound } from '@/app/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/dashboard',
    Component: ClientDashboard,
  },
  {
    path: '/review/:id',
    Component: VideoReview,
  },
  {
    path: '/admin',
    Component: AdminDashboard,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);