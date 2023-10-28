/**
 * Defines the needed properties of the Question for all InRoom components.
 */
export type QuestionProps = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  likeCount: number;
  isAnswered?: boolean;
  isHighlighted?: boolean;
  isAnonymous?: boolean;
};

/**
 * Defines the needed properties of the User for all InRoom components.
 */
export type UserProps = {
  id: string;
  name: string;
  avatar: string;
};
