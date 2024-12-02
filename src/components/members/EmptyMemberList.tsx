import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EmptyMemberList: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow">
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
      
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">{t('members.noMembers')}</h3>
        <p className="mt-1 text-sm text-gray-500">{t('members.noMembersDescription')}</p>
        <div className="mt-6">
          <Link
            to="/members/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            {t('members.add')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyMemberList;