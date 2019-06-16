export interface ArticleModel {
  id: string;
  title: string;
  tableOfContents: string[];
  contents: ContentsModel[];
}

export interface ContentsModel {
  heading?: string;
  code?: {
    body: string;
  } | null;
  body?: string | '';
  img?: string | null;
  highlight?: {
    type: 'note' | 'danger' | 'warn' | string;
    body: string;
  };
}
