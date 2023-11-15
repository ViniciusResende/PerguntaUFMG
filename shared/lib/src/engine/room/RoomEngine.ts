/**
 * @category Engine
 * @module RoomEngine
 */

/** Enums */
import { RoomActionTypeEnum } from '../../data/enums/RoomEnums';

/** Errors */
import { RoomEngineError } from './RoomEngineErrors';

/** Interfaces */
import {
  ICreateQuestionData,
  ICreateRoomData,
  IQuestion,
  IRoom,
} from '../../data/interfaces/RoomInterfaces';

/** Classes */
import { Utilities } from '../../utils/Utilities';

/** Access */
import { RoomAccess } from '../../access/room/RoomAccess';

/**
 * Class to provide business operations related to authentication.
 */
export class RoomEngine {
  #roomAccess: RoomAccess;
  #roomMetadata: Partial<IRoom> | null;

  constructor() {
    this.#roomAccess = new RoomAccess();
    this.#roomMetadata = null;
  }

  /**
   * Creates a new question using it's room code.
   * @param data - Data used to create a new question
   */
  public async createQuestion(data: ICreateQuestionData): Promise<void> {
    try {
      if (!this.#roomMetadata?.id)
        throw new RoomEngineError('No room selected to create question at.');

      await this.#roomAccess.create(
        RoomActionTypeEnum.QUESTION,
        data,
        this.#roomMetadata.id
      );
    } catch (err: unknown) {
      const error = err as RoomEngineError;

      Utilities.logging.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * Creates a new question like using it's room code and question id.
   * @param data - Data used to create a new question like
   * @returns The id of the new room created.
   */
  public async createRoom(data: ICreateRoomData): Promise<string> {
    try {
      const newRoomId = await this.#roomAccess.create(
        RoomActionTypeEnum.ROOM,
        data
      );

      if (!newRoomId) throw new RoomEngineError('Error while creating room.');

      return newRoomId;
    } catch (err: unknown) {
      const error = err as RoomEngineError;

      Utilities.logging.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * Deletes a question using it's room code and question id.
   * @param questionId - The question id to be deleted
   */
  public async deleteQuestion(questionId: string): Promise<void> {
    try {
      if (!this.#roomMetadata?.id)
        throw new RoomEngineError('No room selected to delete question at.');

      if (this.#roomMetadata.authorId !== Utilities.security.user?.id) {
        const errorMessage = 'Only the room author can delete a question.';
        Utilities.security.publishApiRequestUnauthorized({
          errorCode: 401,
          errorMessage,
        });

        throw new RoomEngineError(errorMessage);
      }

      await this.#roomAccess.delete(
        RoomActionTypeEnum.QUESTION,
        this.#roomMetadata.id,
        questionId
      );
    } catch (err: unknown) {
      const error = err as RoomEngineError;

      Utilities.logging.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * Dislikes the question using it's room code, question id and like id.
   * @param questionId - The question id to be disliked
   * @param likeId - The like id to be disliked
   */
  public async dislikeQuestion(
    questionId: string,
    likeId: string
  ): Promise<void> {
    try {
      const requesterId = Utilities.security.user?.id;

      if (!requesterId) {
        const errorMessage = 'User is not authenticated to dislike a question.';
        Utilities.security.publishApiRequestUnauthorized({
          errorCode: 401,
          errorMessage,
        });

        throw new RoomEngineError(errorMessage);
      }

      if (!this.#roomMetadata?.id)
        throw new RoomEngineError('No room selected to dislike question at.');

      await this.#roomAccess.delete(
        RoomActionTypeEnum.LIKE,
        this.#roomMetadata.id,
        questionId,
        likeId
      );
    } catch (err: unknown) {
      const error = err as RoomEngineError;

      Utilities.logging.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * Ends a room using it's room code.
   */
  public async endRoom(): Promise<void> {
    try {
      if (!this.#roomMetadata?.id)
        throw new RoomEngineError('No room selected to end.');

      if (this.#roomMetadata.authorId !== Utilities.security.user?.id) {
        const errorMessage = 'Only the room author can end a room.';
        Utilities.security.publishApiRequestUnauthorized({
          errorCode: 401,
          errorMessage,
        });

        throw new RoomEngineError(errorMessage);
      }

      await this.#roomAccess.delete(
        RoomActionTypeEnum.ROOM,
        this.#roomMetadata.id
      );
    } catch (err: unknown) {
      const error = err as RoomEngineError;

      Utilities.logging.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * Fetches a room using it's room code.
   * @param roomCode - The room code to be fetched
   * @returns The room data
   */
  public async fetchRoom(roomCode: string): Promise<IRoom> {
    try {
      const requesterId = Utilities.security.user?.id;
      const roomData = (await this.#roomAccess.fetch(
        RoomActionTypeEnum.ROOM,
        roomCode,
        requesterId ?? ''
      )) as IRoom;

      if (!roomData)
        throw new RoomEngineError(`Room with code ${roomCode} not found.`);

      this.#roomMetadata = {
        authorId: roomData.authorId,
        id: roomData.id,
      };

      return roomData;
    } catch (err: unknown) {
      const error = err as RoomEngineError;

      Utilities.logging.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * Likes the question using it's room code and question id. The authenticated
   * user will like it.
   * @param questionId - The question id to be liked
   */
  public async likeQuestion(questionId: string): Promise<void> {
    try {
      const requesterId = Utilities.security.user?.id;

      if (!requesterId) {
        const errorMessage = 'User is not authenticated to like a question.';
        Utilities.security.publishApiRequestUnauthorized({
          errorCode: 401,
          errorMessage,
        });

        throw new RoomEngineError(errorMessage);
      }

      if (!this.#roomMetadata?.id)
        throw new RoomEngineError('No room selected to like question at.');

      await this.#roomAccess.create(
        RoomActionTypeEnum.LIKE,
        { authorId: requesterId },
        this.#roomMetadata.id,
        questionId
      );
    } catch (err: unknown) {
      const error = err as RoomEngineError;

      Utilities.logging.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * Updates a room question using it's room code and question id.
   * @param data - The question data to be updated.
   * @param questionId - The question id to be updated.
   */
  public async questionUpdate(
    data: Partial<IQuestion>,
    questionId: string
  ): Promise<void> {
    try {
      if (!this.#roomMetadata?.id)
        throw new RoomEngineError('No room selected to delete question at.');

      if (this.#roomMetadata.authorId !== Utilities.security.user?.id) {
        const errorMessage = 'Only the room author can update a question.';
        Utilities.security.publishApiRequestUnauthorized({
          errorCode: 401,
          errorMessage,
        });

        throw new RoomEngineError(errorMessage);
      }

      await this.#roomAccess.update(
        RoomActionTypeEnum.QUESTION,
        data,
        this.#roomMetadata?.id,
        questionId
      );
    } catch (err: unknown) {
      const error = err as RoomEngineError;

      Utilities.logging.error(error.message, error.stack);
      throw error;
    }
  }

  /**
   * Subscribes a callback to room changes.
   * @param callback - The callback to be subscribed
   */
  public subscribeToRoomChanges(callback: (data: IRoom) => void) {
    try {
      if (!this.#roomMetadata?.id)
        throw new RoomEngineError('No room selected to subscribe.');

      this.#roomAccess.subscribeToChanges(
        RoomActionTypeEnum.ROOM,
        (data: unknown) => callback(data as IRoom),
        this.#roomMetadata.id,
        Utilities.security.user?.id ?? ''
      );
    } catch (err: unknown) {
      const error = err as RoomEngineError;

      Utilities.logging.error(error.message, error.stack);
      throw error;
    }
  }
}
