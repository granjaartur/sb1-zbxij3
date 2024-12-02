import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GroupMembers from '../../components/groups/GroupMembers';

const GroupMembersPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSave = async (memberIds: string[]) => {
    try {
      const response = await fetch(`/api/groups/${id}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memberIds }),
      });

      if (!response.ok) throw new Error('Failed to update group members');
      
      navigate('/groups');
    } catch (error) {
      console.error('Error updating group members:', error);
    }
  };

  if (!id) return null;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {t('groups.members')}
      </h1>
      <GroupMembers groupId={id} onSave={handleSave} />
    </div>
  );
};

export default GroupMembersPage;