import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ theme, toggleTheme }) => {
  return (
    <div className='flex flex-col min-h-screen transition-colors duration-300'>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className='grow p-4 container mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;