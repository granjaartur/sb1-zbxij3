import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GroupForm from '../../components/groups/GroupForm';

const GroupFormPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/groups${id ? `/${id}` : ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save group');
      
      navigate('/groups');
    } catch (error) {
      console.error('Error saving group:', error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEditing ? t('groups.edit') : t('groups.add')}
      </h1>
      <GroupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default GroupFormPage;