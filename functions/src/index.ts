/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
// import {onRequest} from "firebase-functions/https";
// import * as logger from "firebase-functions/logger";

import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import { onCall } from "firebase-functions/v2/https";

admin.initializeApp();

export const onUserCreate = onDocumentCreated(
  "users/{userId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const userId = event.params.userId;

    await snapshot.ref.update({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "active",
      role: "user",
    });

    console.log(`User profile initialized for ${userId}`);
  }
);


export const updateUserProfile = onCall(
  { region: "us-central1" },
  async (request) => {
    if (!request.auth) {
      throw new Error("Unauthenticated");
    }

    const uid = request.auth.uid;
    const { firstName, lastName, photoURL } = request.data;

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (photoURL) updateData.photoURL = photoURL;

    await admin.firestore().doc(`users/${uid}`).set(updateData, { merge: true });


    return { success: true };
  }
);


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
