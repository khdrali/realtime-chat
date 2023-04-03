import React from "react";
import Link from "next/link";
import style from "@/styles/register.module.scss";
import google from "public/images/google.svg";

export default function Login() {
  return (
    <>
      <div className={style.main}>
        <div className={style.content}>
          <div className={`p-4 ${style.border}`}>
            <h3>Register</h3>
            <p>Let's Create Your Account!</p>
            <div class="form-floating mb-4">
              <input
                type="text"
                class="form-control"
                id="floatingName"
                placeholder="Your Name"
              />
              <label for="floatingName">Name</label>
            </div>
            <div class="form-floating mb-4">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>
            <button className={`btn ${style.login}`}>Register</button>
            <p className={style.with}>Register with</p>
            <button className={`btn ${style.google}`}>
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
