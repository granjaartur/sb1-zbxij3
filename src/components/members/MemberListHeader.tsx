import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MemberListHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{t('members.title')}</h2>
        <Link
          to="/members/new"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          {t('members.add')}
        </Link>
      </div>
    </div>
  );
};

export default MemberListHeader;