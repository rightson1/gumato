//firebase
export const firebaseApiKey = assertValue(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  "Firebase API Key is not provided"
);
export const firebaseAuthDomain = assertValue(
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  "Firebase Auth Domain is not provided"
);
export const firebaseProjectId = assertValue(
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  "Firebase Project ID is not provided"
);
export const firebaseStorageBucket = assertValue(
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  "Firebase Storage Bucket is not provided"
);
export const firebaseMessagingSenderId = assertValue(
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  "Firebase Messaging Sender ID is not provided"
);
export const firebaseAppId = assertValue(
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  "Firebase App ID is not provided"
);

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
