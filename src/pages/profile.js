import React from "react";
import style from "@/styles/profile.module.scss";
import picture from "public/images/profile.png";

export default function profile() {
  return (
    <>
      <div className={style.main}>
        <div className={style.content}>
          <div className={style.border}>
            <button className={style.edit}>Edit Profile</button>
            <div>
              <img src={picture.src} />
              <h4>Gloria Mckinney</h4>
              <hr />
              <p>+375(29)9638433</p>
              <p>test@gmail.com</p>
              <hr />
              <p>Bio</p>
              <h4 className="mt-4">
                I’m Senior Frontend Developer from Microsoft
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
