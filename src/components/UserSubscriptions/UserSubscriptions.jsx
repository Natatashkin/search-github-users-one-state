import React from "react";
import { HiOutlineUsers } from "react-icons/hi2";
import { GoPrimitiveDot } from "react-icons/go";
import { Subscriptions } from "./UserSubscriptions.styled";

const UserSubscriptions = ({ followers, following }) => {
  return (
    <Subscriptions>
      <HiOutlineUsers />
      <div>
        <span className="quantity">{followers}</span>
        <span>followers</span>
      </div>
      <GoPrimitiveDot />
      <div>
        <span className="quantity">{following}</span>
        <span>following</span>
      </div>
    </Subscriptions>
  );
};

export default UserSubscriptions;
