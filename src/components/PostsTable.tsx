import React from 'react';
import { PostsTableProps } from '../types';

const PostsTable: React.FC<PostsTableProps> = React.memo(({ data, searchTerm }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>User ID</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><strong>{item.title || 'N/A'}</strong></td>
                <td>{item.userId || 'N/A'}</td>
                <td className="text-muted">{item.body || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
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

