import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Users, Grid, CreditCard, Layers } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    { icon: Users, label: t('members.title'), path: '/members' },
    { icon: Grid, label: t('groups.title'), path: '/groups' },
    { icon: Layers, label: t('services.title'), path: '/services' },
    { icon: CreditCard, label: t('payments.title'), path: '/payments' },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="h-full px-3 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 ${
                isActive(item.path) ? 'text-indigo-500' : 'text-gray-400'
              }`} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;