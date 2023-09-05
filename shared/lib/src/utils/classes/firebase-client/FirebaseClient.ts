/**
 * @category Utility Class
 * @module Client
 */

/** Firebase Imports */
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';

/** Utilities */
import { Utilities } from '../../Utilities';

/** Interfaces */
import {
  FirebaseClientAuthResponse,
  IFirebaseAuthModule,
  IFirebaseClientConfig,
  IFirebaseDatabaseModule,
} from './FirebaseClientInterfaces';

/** Enums */
import { FirebaseClientFallbacks } from './FirebaseClientEnums';

/** Errors */
import { FirebaseClientError } from './FirebaseClientErrors';

/**
 * FirebaseClient's util class.
 */
export class FirebaseClient {
  #authModule: IFirebaseAuthModule;
  #databaseModule: IFirebaseDatabaseModule;

  constructor(config: IFirebaseClientConfig) {
    initializeApp(config);

    this.#authModule = {
      auth: getAuth(),
      authProvider: new GoogleAuthProvider(),
      signIn: signInWithPopup,
      signOut,
    };
    this.#databaseModule = {
      db: getDatabase(),
      ref: ref,
      onValue: onValue,
      push: push,
      set: set,
    };
  }

  /**
   * Authenticates the user using Google authentication from Firebase.
   *
   * @returns Authenticated user data
   *
   * @throws FirebaseClientError
   */
  async authenticate(): Promise<FirebaseClientAuthResponse | undefined> {
    const { auth, authProvider, signIn } = this.#authModule;

    try {
      const { user } = await signIn(auth, authProvider);

      if (!user) throw new FirebaseClientError('User not found');

      Utilities.logging.info('User logged in', user);
      return {
        uid: user.uid,
        displayName: user.displayName ?? FirebaseClientFallbacks.USER_NAME,
        photoURL: user.photoURL ?? FirebaseClientFallbacks.USER_PROFILE,
      };
    } catch (error) {
      Utilities.logging.error(error);
    }
  }

  /**
   * Signs out the user from Firebase.
   *
   * @throws FirebaseClientError
   */
  async signOut(): Promise<void> {
    const { auth, signOut } = this.#authModule;

    try {
      await signOut(auth);
    } catch (error) {
      Utilities.logging.error(error);
    }
  }

  /**
   * Write data to the Firebase realtime database.
   * @param path - Firebase realtime database reference path
   * @param data - Data to be written to the database
   *
   * @throws FirebaseClientError
   */
  async writeData(path: string, data: unknown): Promise<void> {
    const { db, ref, set } = this.#databaseModule;

    try {
      await set(ref(db, path), data);
    } catch (error) {
      Utilities.logging.error(error);
    }
  }
}
