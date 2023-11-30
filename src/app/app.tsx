import { AppRoutes } from '../app.routes/app.routes';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';

export function App() {
  return (
    <>
      <Header></Header>
      <AppRoutes></AppRoutes>
      <Footer></Footer>
    </>
  );
}
