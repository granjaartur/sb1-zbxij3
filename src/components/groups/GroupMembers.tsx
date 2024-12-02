import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X } from 'lucide-react';
import type { Member } from '@prisma/client';

interface GroupMembersProps {
  groupId: string;
  initialMembers?: string[];
  onSave: (memberIds: string[]) => Promise<void>;
}

const GroupMembers: React.FC<GroupMembersProps> = ({ groupId, initialMembers = [], onSave }) => {
  const { t } = useTranslation();
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set(initialMembers));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members');
      if (!response.ok) throw new Error('Failed to fetch members');
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMember = (memberId: string) => {
    const newSelected = new Set(selectedMembers);
    if (newSelected.has(memberId)) {
      newSelected.delete(memberId);
    } else {
      newSelected.add(memberId);
    }
    setSelectedMembers(newSelected);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(Array.from(selectedMembers));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-4">{t('common.loading')}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{t('groups.members')}</h3>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {saving ? t('common.loading') : t('common.save')}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                <div className="text-sm text-gray-500">{member.email}</div>
              </div>
              <button
                onClick={() => toggleMember(member.id)}
                className={`p-2 rounded-full ${
                  selectedMembers.has(member.id)
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {selectedMembers.has(member.id) ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <X className="h-5 w-5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupMembers;