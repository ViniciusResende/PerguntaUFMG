/**
 * @category Manager
 * @module RoomManager
 */

/** Classes */
import { PubSub } from '../../utils/classes/pubsub/PubSub';

/** Engines */
import { RoomEngine } from '../../engine/room/RoomEngine';

/** Enums */
import { RoomEvents } from './RoomManagerEnums';

/** Interfaces */
import {
  ICreateQuestionData,
  ICreateRoomData,
  IRoom,
} from '../../data/interfaces/RoomInterfaces';

/** Utilities */
import { Utilities } from '../../utils/Utilities';

/**
 * Class to handle business logic related to the room entity at any level
 * of the application
 */
export class RoomManager extends PubSub {
  EVENTS: typeof RoomEvents;
  #roomEngine: RoomEngine;
  #roomMetadata: Partial<IRoom> | null;

  constructor() {
    super();
    this.EVENTS = RoomEvents;
    this.#roomEngine = new RoomEngine();
    this.#roomMetadata = null;

    this.onRoomUpdate = this.onRoomUpdate.bind(this);
  }

  /**
   * Adds the event listeners to the room.
   */
  private addEventListeners(): void {
    if (!this.#roomMetadata) return;
    const subscribeToRoomChanges = () =>
      this.#roomEngine.subscribeToRoomChanges(this.onRoomUpdate);

    Utilities.security.subscribe(
      Utilities.security.EVENTS.NEW_USER_AUTH,
      subscribeToRoomChanges
    );
    subscribeToRoomChanges();
  }

  /**
   * After a room update publishes the event.
   * @param data - Updated data of the room
   *
   * @fires RoomManager#ROOM_DATA_CHANGED
   */
  private onRoomUpdate(data: IRoom): void {
    this.publish(RoomEvents.ROOM_DATA_CHANGED, data);
  }

  /**
   * Updates the room metadata.
   * @param data - Data used to update the metadata of the room
   */
  private updateRoomMetadata(data: Partial<IRoom>): void {
    this.#roomMetadata = {
      authorId: data.authorId,
      endedAt: data.endedAt,
      id: data.id,
    };

    this.addEventListeners();
    this.publish(RoomEvents.ROOM_METADATA_CHANGED, this.#roomMetadata);
  }

  /**
   * Updates a question marking it as answered.
   * @param questionId - The question id to be checked as answered
   */
  public async checkQuestionAsAnswered(questionId: string): Promise<void> {
    try {
      this.#roomEngine.questionUpdate({ isAnswered: true }, questionId);
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while editing question:', content: error.message }
      );
    }
  }

  /**
   * Creates a new room.
   * @param data - Data used to create a new room
   * @returns The if of the new room created.
   */
  public async createRoom(data: ICreateRoomData): Promise<string> {
    try {
      const newRoomId = await this.#roomEngine.createRoom(data);

      Utilities.notification.push(
        'authenticated',
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.SUCCESS,
        {
          title: 'Sala criada com Sucesso',
          content:
            'Sua sala foi criada com sucesso! Copie o código e compartilhe com os participantes!',
        }
      );

      return newRoomId;
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while creating room:', content: error.message }
      );
      throw error;
    }
  }

  /**
   * Deletes a question using it's question id.
   * @param questionId - The question id to be deleted
   */
  public async deleteQuestion(questionId: string): Promise<void> {
    try {
      await this.#roomEngine.deleteQuestion(questionId);

      Utilities.notification.push(
        'authenticated',
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.SUCCESS,
        {
          title: 'Pergunta apagada com sucesso',
          content:
            'A pergunta foi apagada e já não é mais visível pelos participantes.',
        }
      );
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while deleting question:', content: error.message }
      );
      throw error;
    }
  }

  /**
   * Dislikes a question like using it's question id and like id.
   * @param questionId - The question id to be disliked
   * @param likeId - The like id to be disliked
   */
  public async dislikeQuestion(
    questionId: string,
    likeId: string
  ): Promise<void> {
    try {
      await this.#roomEngine.dislikeQuestion(questionId, likeId);
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while disliking question:', content: error.message }
      );
    }
  }

  /**
   * Ends the active room.
   */
  public async endRoom(): Promise<void> {
    try {
      await this.#roomEngine.endRoom();

      this.updateRoomMetadata({
        id: this.#roomMetadata?.id as string,
        authorId: this.#roomMetadata?.authorId as string,
        endedAt: new Date().toISOString(),
      });

      Utilities.notification.push(
        'authenticated',
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.SUCCESS,
        {
          title: 'Sala encerrada com sucesso',
          content:
            'A sala foi encerrada com sucesso, esperamos que tenha tido uma boa experiência.',
        }
      );
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while ending room:', content: error.message }
      );
      throw error;
    }
  }

  /**
   * Retrieves the room metadata.
   * @returns The room data
   */
  get roomMetadata(): Partial<IRoom> | null {
    return this.#roomMetadata;
  }

  /**
   * Highlights a question using it's question id.
   * @param questionId - The question id to be highlighted
   */
  public async highlightQuestion(questionId: string): Promise<void> {
    try {
      this.#roomEngine.questionUpdate({ isHighlighted: true }, questionId);
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while editing question:', content: error.message }
      );
    }
  }

  /**
   * Retrieves the room data after fetching it, subscribing to room changes events.
   * @param roomCode - The room code to be joined
   * @returns The room data
   */
  public async joinRoom(roomCode: string): Promise<IRoom> {
    try {
      const roomData = await this.#roomEngine.fetchRoom(roomCode);

      this.updateRoomMetadata(roomData);

      return roomData;
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while joining room:', content: error.message }
      );
      throw error;
    }
  }

  /**
   * Adds a new like to a give question id
   * @param questionId - The question id to be liked.
   */
  public async likeQuestion(questionId: string): Promise<void> {
    try {
      await this.#roomEngine.likeQuestion(questionId);
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        { title: 'Error while liking question:', content: error.message }
      );
    }
  }

  /**
   * Sends a new question to the room.
   * @param data - Data used to create a new question
   */
  public async sendQuestion(data: ICreateQuestionData): Promise<void> {
    try {
      await this.#roomEngine.createQuestion(data);

      Utilities.notification.push(
        'authenticated',
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.SUCCESS,
        {
          title: 'Pergunta enviada com sucesso',
          content:
            'A sua pergunta foi enviada e já está visível para todos os paricipantes.',
        }
      );
    } catch (err: unknown) {
      const error = err as Error;

      Utilities.notification.push(
        error.name,
        Utilities.notification.TYPE.TOAST,
        Utilities.notification.STATUS.ERROR,
        {
          title: 'Error while sending question:',
          content: error.message,
        }
      );
    }
  }
}
