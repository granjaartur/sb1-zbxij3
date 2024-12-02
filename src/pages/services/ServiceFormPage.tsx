import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServiceForm from '../../components/services/ServiceForm';
import { api } from '../../utils/api';

export const ServiceFormPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, groupsData] = await Promise.all([
          api.get('/api/services/categories'),
          api.get('/api/groups')
        ]);

        setCategories(categoriesData);
        setGroups(groupsData);

        if (isEditing) {
          const serviceData = await api.get(`/api/services/${id}`);
          setInitialData(serviceData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditing]);

  if (loading) {
    return <div className="text-center py-4">{t('common.loading')}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEditing ? t('services.edit') : t('services.add')}
      </h1>
      <ServiceForm
        initialData={initialData}
        isEditing={isEditing}
        categories={categories}
        groups={groups}
      />
    </div>
  );
};