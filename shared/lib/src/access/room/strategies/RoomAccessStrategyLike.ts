/**
 * @category Access
 * @module RoomAccess
 */

/** Classes */
import { RoomAccessStrategy } from './RoomAccessStrategy';

/** Utilities */
import { Utilities } from '../../../utils/Utilities';

/**
 * Class that specifies Like Action access strategy
 */
export class RoomAccessStrategyLike extends RoomAccessStrategy {
  /**
   * Creates a new question like using the API.
   * @param data - Data used to create a new like
   * @param roomCode - The room code where question is located
   * @param questionId - The question id where like will be added
   */
  public async create(
    data: { authorId: string },
    roomCode: string,
    questionId: string
  ): Promise<undefined> {
    await this.api?.createQuestionLike(roomCode, questionId, data);
  }

  /**
   * Deletes a question like using the API.
   * @param roomCode - The room code to be deleted
   * @param questionId - The question id to be deleted
   * @param likeId - The like id to be deleted
   */
  public async delete(
    roomCode: string,
    questionId: string,
    likeId: string
  ): Promise<void> {
    await this.api?.deleteQuestionLike(roomCode, questionId, likeId);
  }

  public async fetch() {
    Utilities.logging.warn(
      'There is no valid implementation for fetching a question like directly.'
    );
  }

  public subscribeToChanges() {
    Utilities.logging.warn(
      'There is no valid implementation for subscribing to question like changes directly.'
    );
  }

  public async update(): Promise<void> {
    Utilities.logging.warn(
      'There is no valid implementation for updating a question like directly.'
    );
  }
}
