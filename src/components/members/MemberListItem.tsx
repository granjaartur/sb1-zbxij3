import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import type { Member } from '../../types/member';

interface MemberListItemProps {
  member: Member;
  onDelete: (id: string) => void;
}

const MemberListItem: React.FC<MemberListItemProps> = ({ member, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{member.name}</div>
        <div className="text-sm text-gray-500">{member.profession}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{member.email}</div>
        <div className="text-sm text-gray-500">{member.phone || member.mobile}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{member.documentId}</div>
        <div className="text-sm text-gray-500">{member.taxId}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link
          to={`/members/${member.id}/edit`}
          className="text-indigo-600 hover:text-indigo-900 mr-4"
        >
          <Edit className="h-5 w-5 inline" />
        </Link>
        <button
          onClick={() => onDelete(member.id)}
          className="text-red-600 hover:text-red-900"
        >
          <Trash2 className="h-5 w-5 inline" />
        </button>
      </td>
    </tr>
  );
};

export default MemberListItem;