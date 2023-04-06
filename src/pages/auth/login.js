import React from "react";
import Link from "next/link";
import style from "@/styles/login.module.scss";
import google from "public/images/google.svg";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import * as useDb from "@/utils/database";
import { useRouter } from "next/router";

const provider = new GoogleAuthProvider();
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
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

  const signInManual = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        useDb.sendData("users", {
          ...usersList,
          [user.uid]: {
            ...usersList[user.uid],
            ...{
              is_online: true,
            },
          },
        });
        localStorage.setItem("uid", user.uid);
        router.replace("/");
      })
      .catch((error) => {
        const errorCode = error?.code?.slice(5).split("-").join(" ");
        const errorMessage =
          errorCode?.charAt(0).toUpperCase() + errorCode?.slice(1);
      });
  };

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        useDb.sendData("users", {
          ...usersList,
          [user.uid]: {
            ...usersList[user.uid],
            ...{
              is_online: true,
            },
          },
        });
        localStorage.setItem("uid", user.uid);
        router.replace("/");
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
            <h3>Login</h3>
            <p>Hi! Welcome Back</p>
            <div className="form-floating mb-4">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className={`btn ${style.login}`} onClick={signInManual}>
              Login
            </button>
            <p className={style.with}>Login with</p>
            <button className={`btn ${style.google}`} onClick={signInGoogle}>
              <img src={google.src}></img>
              Google
            </button>
            <h5>
              Don’t have an account?
              <Link href="/auth/register">
                <span>Sign Up</span>
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
