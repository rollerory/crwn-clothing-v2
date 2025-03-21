import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider, 
} from 'firebase/auth';
import { getFirestore,
        doc,
        getDoc,
        setDoc,
 } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDDfpHBCpYwPS42IScnIoP9N7pScUBbHNc",
    authDomain: "crwn-clothing-db-ea1b6.firebaseapp.com",
    projectId: "crwn-clothing-db-ea1b6",
    storageBucket: "crwn-clothing-db-ea1b6.firebasestorage.app",
    messagingSenderId: "770138827047",
    appId: "1:770138827047:web:d33aed93aff54f7f3b6102"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }   catch (error) {
            console.log("error creating the user", error.message);
            
        }
    }

    return userDocRef;
} 