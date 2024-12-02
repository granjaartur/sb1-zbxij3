import React from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut } from 'lucide-react';
import LanguageSelector from '../common/LanguageSelector';

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className="h-16 bg-white shadow-lg">
      <div className="h-full max-w-7xl mx-auto px-4">
        <div className="h-full flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {t('app.title')}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <button 
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
              title={t('auth.logout')}
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;