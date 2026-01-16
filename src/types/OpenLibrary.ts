export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

export interface OpenLibrarySearchResponse {
  docs: OpenLibraryDoc[];
}
