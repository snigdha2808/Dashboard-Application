import React from 'react';
import { PostsTableProps } from '../types';

const PostsTable: React.FC<PostsTableProps> = React.memo(({ data, searchTerm }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Body</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.title || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.userId || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.body || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                {searchTerm ? (
                  'No posts found matching your search criteria.'
                ) : (
                  'No data available.'
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

PostsTable.displayName = 'PostsTable';

export default PostsTable;
