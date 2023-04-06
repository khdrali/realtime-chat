import React from "react";
import style from "@/styles/profile.module.scss";
import picture from "public/images/profile.png";
import * as useDb from "@/utils/database";
import { Avatar, ListItemAvatar } from "@mui/material";

export default function Profile() {
  const [usersList, setUsersList] = React.useState({});

  React.useEffect(() => {
    useDb.getData(`users/${localStorage.getItem("uid")}`, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setUsersList(data);
      }
    });
  }, []);
  return (
    <>
      <div className={style.main}>
        <div className={style.content}>
          <div className={style.border}>
            <button className={style.edit}>Edit Profile</button>
            <div>
              <div className={style.image}>
                <ListItemAvatar>
                  <Avatar
                    src={
                      usersList.photo ??
                      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                    }
                  />
                </ListItemAvatar>
              </div>
              {/* <img src={picture.src} /> */}
              <h4>{usersList.fullname}</h4>
              <hr />
              <p></p>
              <p>{usersList.email}</p>
              <hr />
              <p>Bio</p>
              <h4 className="mt-4"></h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
