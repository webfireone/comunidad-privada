/**
 * Firebase Configuration - Growith
 * Production-ready Firebase setup
 */

const firebaseConfig = {
    apiKey: "AIzaSyBvQ8tY7l3VxH3qN9jK5pR2wE4tY6uI0o",
    authDomain: "growith-agency.firebaseapp.com",
    projectId: "growith-agency",
    storageBucket: "growith-agency.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abc123def456ghi789jkl",
    measurementId: "G-ABC123DEF4"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    
    // Initialize services
    const auth = firebase.auth();
    const db = firebase.firestore();
    const storage = firebase.storage();
    const analytics = firebase.analytics();
    const messaging = firebase.messaging();
    
    // Enable offline persistence
    db.enablePersistence()
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
            } else if (err.code == 'unimplemented') {
                console.warn('The current browser does not support offline persistence.');
            }
        });
    
    console.log('%cFirebase initialized ✅', 'color: #10b981; font-weight: bold; font-size: 14px;');
}
