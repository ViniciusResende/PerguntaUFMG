/**
 * @category API
 * @module ApiPer
 */

/**
 * API data representation for question elements.
 */
interface IApiClientQuestionData {
  content: string;
  author: {
    name: string;
    profile: string;
  };
  isAnonymous: boolean;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: { authorId: string }[];
}

/**
 * API data representation for room elements.
 */
export interface IApiClientRoomData {
  title: string;
  authorId: string;
  questions: Record<string, IApiClientQuestionData>;
  endedAt: string | null;
}

/**
 * API data representation for general Auth responses'.
 */
export interface IApiPerAuthResponse {
  id: string;
  name: string;
  profile: string;
}
