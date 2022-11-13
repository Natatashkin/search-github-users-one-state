import React from "react";

const UserName = ({ name, login, url }) => {
  const hasUsername = name ? name : "No username";
  return (
    <div>
      {<h3>{hasUsername}</h3>}
      <h4>
        <a href={url} target="_blank" rel="noreferrer">{`@${login}`}</a>
      </h4>
    </div>
  );
};

export default UserName;
