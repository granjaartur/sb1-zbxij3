import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CategoryForm from '../../components/services/CategoryForm';

export const CategoryFormPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/services/categories${id ? `/${id}` : ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save category');
      
      navigate('/services/categories');
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEditing ? t('services.category.edit') : t('services.category.add')}
      </h1>
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
};