import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, Users, Plus, Grid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import type { Group } from '@prisma/client';

interface GroupWithMembers extends Group {
  members: { member: { name: string } }[];
}

const GroupList: React.FC = () => {
  const { t } = useTranslation();
  const [groups, setGroups] = useState<GroupWithMembers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const data = await api.get<GroupWithMembers[]>('/api/groups');
      setGroups(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">{t('common.loading')}</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  if (groups.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">{t('groups.title')}</h2>
            <Link
              to="/groups/new"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              {t('groups.add')}
            </Link>
          </div>
        </div>
        
        <div className="text-center py-12">
          <Grid className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">{t('groups.noGroups')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('groups.noGroupsDescription')}</p>
          <div className="mt-6">
            <Link
              to="/groups/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              {t('groups.add')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{t('groups.title')}</h2>
          <Link
            to="/groups/new"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            {t('groups.add')}
          </Link>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('groups.name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('groups.members')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('common.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {groups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{group.name}</div>
                  <div className="text-sm text-gray-500">{group.description}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      {group.members.length} {t('groups.members')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/groups/${group.id}/members`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    title={t('groups.members')}
                  >
                    <Users className="h-5 w-5 inline" />
                  </Link>
                  <Link
                    to={`/groups/${group.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    title={t('common.edit')}
                  >
                    <Edit className="h-5 w-5 inline" />
                  </Link>
                  <button
                    onClick={() => {/* Implement delete handler */}}
                    className="text-red-600 hover:text-red-900"
                    title={t('common.delete')}
                  >
                    <Trash2 className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupList;