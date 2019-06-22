import firebase from 'firebase';

export function signInWithEmail(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function signUpWithEmail(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}

export function signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}

export function signOut() {
    return firebase.auth().signOut();
}