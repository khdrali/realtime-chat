import React from "react";
import Link from "next/link";
import style from "@/styles/register.module.scss";
import google from "public/images/google.svg";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import * as useDb from "@/utils/database";

const provider = new GoogleAuthProvider();

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usersList, setUsersList] = React.useState({});

  React.useEffect(() => {
    useDb.getData("users", (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setUsersList(data);
      }
    });
  }, []);

  const registerManual = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...

        console.log(user);

        useDb.sendData("users", {
          ...usersList,
          [user.uid]: {
            emailVerified: user.emailVerified,
            timestamp: new Date().getTime(),
            user_id: user.uid,
            photo:
              "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
            fullname: name,
            phone: user.phoneNumber,
            email: user.email,
          },
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const registGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        useDb.sendData("users", {
          ...usersList,
          [user.uid]: {
            emailVerified: user.emailVerified,
            timestamp: new Date().getTime(),
            user_id: user.uid,
            photo: user.photoURL,
            fullname: user.displayName,
            phone: user.phoneNumber,
            email: user.email,
            is_online: false,
          },
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <>
      <div className={style.main}>
        <div className={style.content}>
          <div className={`p-4 ${style.border}`}>
            <h3>Register</h3>
            <p>Let&apos;s Create Your Account!</p>
            <div class="form-floating mb-4">
              <input
                type="text"
                class="form-control"
                id="floatingName"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
              />
              <label for="floatingName">Name</label>
            </div>
            <div class="form-floating mb-4">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <button className={`btn ${style.login}`} onClick={registerManual}>
              Register
            </button>
            <p className={style.with}>Register with</p>
            <button className={`btn ${style.google}`} onClick={registGoogle}>
              <img src={google.src}></img>
              Google
            </button>
            <h5>
              Do you have an account?
              <Link href="/auth/login">
                <span>Sign In</span>
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
