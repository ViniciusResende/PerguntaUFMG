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
import {
  get,
  getDatabase,
  ref,
  remove,
  onValue,
  push,
  set,
  update,
} from 'firebase/database';

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
      get: get,
      ref: ref,
      remove: remove,
      onValue: onValue,
      push: push,
      set: set,
      update: update,
    };
  }

  /**
   * Authenticates the user using Google authentication from Firebase.
   *
   * @returns Authenticated user data
   *
   * @throws FirebaseClientError
   */
  public async authenticate(): Promise<FirebaseClientAuthResponse | undefined> {
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
  public async signOut(): Promise<void> {
    const { auth, signOut } = this.#authModule;

    try {
      await signOut(auth);
    } catch (error) {
      Utilities.logging.error(error);
    }
  }

  /**
   * Fetch data from the Firebase realtime database.
   * @param path - Firebase realtime database reference path
   * @returns Data fetched from the database
   */
  public async fetchData(path: string): Promise<unknown> {
    const { db, get, ref } = this.#databaseModule;

    try {
      const snapshot = await get(ref(db, path));

      if (snapshot.exists()) return snapshot.val();
      else throw new FirebaseClientError('No data available on this path');
    } catch (error) {
      Utilities.logging.error(error);
    }
  }

  /**
   * Write data to the Firebase realtime database.
   * @param path - Firebase realtime database reference path
   * @param data - Data to be written to the database
   * @returns The key of the new element added to the database
   */
  public async writeData(path: string, data: unknown): Promise<string> {
    const { db, ref, set, push } = this.#databaseModule;

    try {
      const { key: newElementKey, ref: newElementRef } = push(ref(db, path));
      await set(newElementRef, data);

      return newElementKey ?? '';
    } catch (error) {
      Utilities.logging.error(error);
      throw new FirebaseClientError('Error writing data to the database');
    }
  }

  /**
   * Update data to the Firebase realtime database.
   * @param path - Firebase realtime database reference path
   * @param data - Data to be written to the database
   */
  public async updateData(path: string, data: object): Promise<void> {
    const { db, ref, update } = this.#databaseModule;
    await update(ref(db, path), data);
  }

  /**
   * This method is used to delete data from the Firebase realtime database.
   * @param path - Firebase realtime database reference path
   */
  public async deleteData(path: string): Promise<void> {
    const { db, ref, remove } = this.#databaseModule;

    try {
      await remove(ref(db, path));
    } catch (error) {
      Utilities.logging.error(error);
    }
  }

  public onDataChange(path: string, callback: (data: unknown) => void) {
    const { db, ref, onValue } = this.#databaseModule;

    try {
      onValue(ref(db, path), (snapshot) => {
        callback(snapshot.val());
      });
    } catch (error) {
      Utilities.logging.error(error);
    }
  }
}
