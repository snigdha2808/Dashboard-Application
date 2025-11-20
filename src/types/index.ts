export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalResults: number;
  totalLoaded: number;
}

export interface PostsTableProps {
  data: Post[];
  searchTerm: string;
}

export interface LoadingIndicatorProps {
  message?: string;
}

export interface ErrorDisplayProps {
  error: string;
}

export interface InfiniteScrollTriggerProps {
  onLoadMore: () => void;
  hasMoreData: boolean;
  loadingMore: boolean;
  loading: boolean;
}

