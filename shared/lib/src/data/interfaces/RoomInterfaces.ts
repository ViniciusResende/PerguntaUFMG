/**
 * @category Interface
 * @module RoomInterfaces
 */

/**
 * Data interface to question creation.
 */
export interface ICreateQuestionData {
  author: {
    name: string;
    profile: string;
  };
  content: string;
  isAnonymous: boolean;
}

/**
 * Data interface to room creation.
 */
export interface ICreateRoomData {
  title: string;
  authorId: string;
}

/**
 * Data interface to question data.
 */
export interface IQuestion {
  author: {
    name: string;
    profile: string;
  };
  content: string;
  id: string;
  isAnonymous: boolean;
  isAnswered: boolean;
  isHighlighted: boolean;
  likesCount: number;
  likeId: string | undefined;
}

/**
 * Data interface to room data.
 */
export interface IRoom {
  id: string;
  title: string;
  authorId: string;
  endedAt: string | null;
  questions: IQuestion[];
}
