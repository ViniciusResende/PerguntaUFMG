/**
 * @category API
 * @module ApiPer
 */

/** Errors */
import { ApiPerError } from './ApiPerErrors';

/** Interfaces */
import { IApiClientRoomData, IApiPerAuthResponse } from './ApiPerInterfaces';
import {
  ICreateQuestionData,
  ICreateRoomData,
  IQuestion,
  IRoom,
} from '../../../data/interfaces/RoomInterfaces';
import { IFirebaseClientConfig } from '../../../utils/classes/firebase-client/FirebaseClientInterfaces';

/** Utilities */
import doesObjectHaveValue from '../../../utils/helpers/doesObjectHaveValue';
import { FirebaseClient } from '../../../utils/classes/firebase-client/FirebaseClient';

/**
 * PerguntaUFMG's API class.
 */
export class ApiPer {
  #apiClient: FirebaseClient;

  constructor(apiConfiguration: unknown) {
    if (!doesObjectHaveValue(apiConfiguration)) {
      throw new ApiPerError('No API configuration object found.');
    }

    this.#apiClient = new FirebaseClient(
      apiConfiguration as IFirebaseClientConfig
    );
  }

  private roomDataTransformer(
    roomId: string,
    roomData: IApiClientRoomData,
    requesterId?: string
  ): IRoom {
    const roomQuestions = roomData?.questions ?? {};
    const parsedQuestions = Object.entries(roomQuestions).map(
      ([questionId, questionData]) => ({
        id: questionId,
        content: questionData.content,
        author: questionData.author,
        isAnonymous: questionData.isAnonymous,
        isAnswered: questionData.isAnswered,
        isHighlighted: questionData.isHighlighted,
        likesCount: Object.keys(questionData.likes ?? {}).length,
        likeId: Object.entries(questionData.likes ?? {}).find(
          ([, likeData]) => likeData.authorId === requesterId
        )?.[0],
      })
    );

    return {
      authorId: roomData.authorId,
      id: roomId,
      questions: parsedQuestions.reverse(),
      title: roomData.title,
      endedAt: roomData.endedAt,
    };
  }

  /**
   * Fetches the Client API and retrieves a user data payload.
   *
   * @returns - The authenticated user data.
   */
  public async authenticate(): Promise<IApiPerAuthResponse | undefined> {
    const authenticatedUser = await this.#apiClient.authenticate();

    if (!authenticatedUser) return undefined;

    return {
      id: authenticatedUser.uid,
      name: authenticatedUser.displayName,
      profile: authenticatedUser.photoURL,
    };
  }

  /**
   * Signs out the user from the Client API.
   */
  public async signOut(): Promise<void> {
    await this.#apiClient.signOut();
  }

  /**
   * Creates a new question in the Client API.
   *
   * @param roomCode - The room code where question will be added.
   * @param data - The question data to be created.
   * @returns The id of the new question created.
   */
  public async createQuestion(
    roomCode: string,
    data: ICreateQuestionData
  ): Promise<string> {
    return await this.#apiClient.writeData(
      `rooms/${roomCode}/questions/`,
      data
    );
  }

  /**
   * Creates a new question like in the Client API.
   * @param roomCode - The room code where question like will be added.
   * @param questionId - The question id where question like will be added.
   * @param data - The question like data to be created.
   * @returns The id of the new like created.
   */
  public async createQuestionLike(
    roomCode: string,
    questionId: string,
    data: { authorId: string }
  ): Promise<string> {
    return await this.#apiClient.writeData(
      `rooms/${roomCode}/questions/${questionId}/likes/`,
      data
    );
  }

  /**
   * Creates a new room in the Client API.
   *
   * @param data - The room data to be created.
   * @returns The id of the new room created.
   */
  public async createRoom(data: ICreateRoomData): Promise<string> {
    return await this.#apiClient.writeData('rooms/', data);
  }

  /**
   * Fetches the Client API and retrieves a room data payload.
   *
   * @param roomCode - The room code to be fetched.
   * @param requesterId - The id requester of the data requester.
   * @returns - The room data.
   */
  public async fetchRoom(
    roomCode: string,
    requesterId?: string
  ): Promise<IRoom> {
    const apiClientRoomData = (await this.#apiClient.fetchData(
      `rooms/${roomCode}/questions/`
    )) as IApiClientRoomData;

    return this.roomDataTransformer(roomCode, apiClientRoomData, requesterId);
  }

  /**
   * Deletes a specific question from a room.
   * @param roomCode - The room code where question will be deleted.
   * @param questionId - The question id to deleted.
   */
  public async deleteQuestion(
    roomCode: string,
    questionId: string
  ): Promise<void> {
    await this.#apiClient.deleteData(
      `rooms/${roomCode}/questions/${questionId}`
    );
  }

  /**
   * Deletes a specific question like from a room.
   * @param roomCode - The room code where question like will be deleted.
   * @param questionId - The question id where question like will be deleted.
   * @param likeId - The like id to be deleted.
   */
  public async deleteQuestionLike(
    roomCode: string,
    questionId: string,
    likeId: string
  ): Promise<void> {
    await this.#apiClient.deleteData(
      `rooms/${roomCode}/questions/${questionId}/likes/${likeId}`
    );
  }

  /**
   * Subscribes to a specific room changes.
   * @param roomCode - The room code where will be subscribed.
   * @param requesterId - The id of the subscriber.
   * @param callback - Callback function to be called when data changes.
   */
  public onRoomChange(
    roomCode: string,
    requesterId: string,
    callback: (data: IRoom) => void
  ) {
    const customCallback = (data: unknown) => {
      const roomData = data as IApiClientRoomData;
      callback(this.roomDataTransformer(roomCode, roomData, requesterId));
    };

    this.#apiClient.onDataChange(`rooms/${roomCode}`, customCallback);
  }

  /**
   * Updates a specific question from a room.
   * @param roomCode - The room code where the question will be updated.
   * @param questionId - The question id to be updated.
   * @param data - The new question data.
   */
  public async updateQuestion(
    roomCode: string,
    questionId: string,
    data: Partial<IQuestion>
  ): Promise<void> {
    await this.#apiClient.updateData(
      `rooms/${roomCode}/questions/${questionId}`,
      data
    );
  }

  /**
   * Updates a specific room.
   * @param roomCode - The room code where the room will be updated.
   * @param data - The new room data.
   */
  public async updateRoom(
    roomCode: string,
    data: Partial<IRoom>
  ): Promise<void> {
    await this.#apiClient.updateData(`rooms/${roomCode}`, data);
  }
}
