/**
 * @category Access
 * @module RoomAccess
 */

/** Interfaces */
import {
  IQuestion,
  ICreateQuestionData,
} from '../../../data/interfaces/RoomInterfaces';

/** Classes */
import { RoomAccessStrategy } from './RoomAccessStrategy';

/** Utilities */
import { Utilities } from '../../../utils/Utilities';

/**
 * Class that specifies Question Action access strategy
 */
export class RoomAccessStrategyQuestion extends RoomAccessStrategy {
  /**
   * Creates a new question using the API.
   * @param data - Data used to create a new question
   * @param roomCode - The room code where question will be added
   */
  public async create(
    data: ICreateQuestionData,
    roomCode: string
  ): Promise<undefined> {
    await this.api?.createQuestion(roomCode, data);
  }

  /**
   * Deletes a question using the API.
   * @param roomCode - The room code to be deleted
   * @param questionId - The question id to be deleted
   */
  public async delete(roomCode: string, questionId: string): Promise<void> {
    await this.api?.deleteQuestion(roomCode, questionId);
  }

  public async fetch() {
    Utilities.logging.warn(
      'There is no valid implementation for fetching a question directly.'
    );
  }

  public subscribeToChanges() {
    Utilities.logging.warn(
      'There is no valid implementation for subscribing to question changes directly.'
    );
  }

  /**
   * Updates a question using the API.
   * @param data - The data to be updated
   * @param roomCode  - The room code where question will be updated
   * @param questionId - The question id to be updated
   */
  public async update(
    data: Partial<IQuestion>,
    roomCode: string,
    questionId: string
  ): Promise<void> {
    await this.api?.updateQuestion(roomCode, questionId, data);
  }
}
