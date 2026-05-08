import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
}

export default Layout;
