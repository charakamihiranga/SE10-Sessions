// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6nlNiX2IAHg5ExATth07ocveaFuHl8eo",
  authDomain: "se10login.firebaseapp.com",
  projectId: "se10login",
  storageBucket: "se10login.appspot.com",
  messagingSenderId: "860492503747",
  appId: "1:860492503747:web:5a45a905db0397871fe076",
  measurementId: "G-JD6RFS4VSQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Sign up function
function userRegistration(event) {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log("User signed up:", user);
          alert("Sign-up successful!");
          
          // Clear the form fields
          document.getElementById('signupForm').reset();

          // Optionally, redirect to a welcome page or sign-in page
          window.location.href = "signin.html";
      })
      .catch((error) => {
          handleAuthError(error);
      });
}

// Sign in function
function userSignIn(event) {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("User signed in:", user);
          alert("Sign-in successful!");

          // Clear the form fields
          document.getElementById('loginForm').reset();
      })
      .catch((error) => {
          handleAuthError(error);
      });
}

// Function to handle authentication errors
function handleAuthError(error) {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.error("Error:", errorCode, errorMessage);

  // Custom error handling
  switch (errorCode) {
      case 'auth/invalid-email':
          alert('Invalid email format. Please check your email.');
          break;
      case 'auth/user-disabled':
          alert('This user has been disabled.');
          break;
      case 'auth/user-not-found':
          alert('No user found with this email.');
          break;
      case 'auth/wrong-password':
          alert('Incorrect password. Please try again.');
          break;
      case 'auth/email-already-in-use':
          alert('This email is already in use by another account.');
          break;
      case 'auth/weak-password':
          alert('The password is too weak. Please choose a stronger password.');
          break;
      default:
          alert('An unexpected error occurred: ' + errorMessage);
  }
}