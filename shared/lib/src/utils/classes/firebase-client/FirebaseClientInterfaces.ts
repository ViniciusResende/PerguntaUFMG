/**
 * @category Utility Class
 * @module Client
 */

/** Firebase Imports */
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { Database, ref, onValue, push, set } from 'firebase/database';

/**
 * Interface of the Firebase Client module that handles the authentication.
 */
export interface IFirebaseAuthModule {
  auth: Auth;
  authProvider: GoogleAuthProvider;
  signIn: typeof signInWithPopup;
  signOut: typeof signOut;
}

/**
 * Interface of the auth payload response of the Firebase Client authentication.
 */
export interface FirebaseClientAuthResponse {
  uid: string;
  displayName: string;
  photoURL: string;
}

/**
 * Interface of the Firebase Client configuration object.
 */
export interface IFirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

/**
 * Interface of the Firebase Client module that handles the database.
 */
export interface IFirebaseDatabaseModule {
  db: Database;
  ref: typeof ref;
  onValue: typeof onValue;
  push: typeof push;
  set: typeof set;
}
