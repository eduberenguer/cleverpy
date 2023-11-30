import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Posts = lazy(() => import('../components/posts/posts'));
const Users = lazy(() => import('../components/users/users'));
const Details = lazy(() => import('../components/details/details'));
const Login = lazy(() => import('../components/login/login'));

export function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Posts></Posts>}></Route>
        <Route path="/users" element={<Users></Users>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/details/:id" element={<Details></Details>}></Route>
      </Routes>
    </Suspense>
  );
}
