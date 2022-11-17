import React from "react";
import { FaUsers } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import { Subscriptions } from "./UserSubscriptions.styled";

const UserSubscriptions = ({ followers, following }) => {
  return (
    <Subscriptions>
      <FaUsers size={20} />
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
