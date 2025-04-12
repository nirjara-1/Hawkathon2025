import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

async function addDonation(imageUrl, description, postedBy) {
  try {
    const docRef = await addDoc(collection(db, 'donations'), {
      imageUrl: imageUrl,
      description: description,
      postedBy: postedBy,
      createdAt: Timestamp.now()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}