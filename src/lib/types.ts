export type GenerateRequest = {
  platform: string;
  scenario: string;
  industry: string;
  tone: string;
  productName?: string;
  details?: string;
  targetAudience?: string;
};

export type GeneratedPost = {
  content: string;
  characterCount: number;
  hashtags: string[];
};

export type GenerateResponse = {
  posts: GeneratedPost[];
  platform: string;
  scenario: string;
};
