import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IconButton } from "../IconButton";
import {
  ReposContainer,
  DropHeader,
  ReposList,
  RepoListItem,
  DropButtonContainer,
  ListContainer,
} from "./UserRepos.styled";

const UserRepos = ({ reposQuantity, repos }) => {
  const showDropdownIcon = Boolean(repos.length);
  const [open, setOpen] = useState(false);
  const toggleOpenClick = () => setOpen(!open);

  return (
    <ReposContainer>
      <DropHeader>
        <p>
          Repositories: <span>{reposQuantity}</span>
        </p>
        {showDropdownIcon && (
          <DropButtonContainer>
            <IconButton onClick={toggleOpenClick}>
              {open ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
            </IconButton>
          </DropButtonContainer>
        )}
      </DropHeader>
      {open && (
        <ListContainer>
          <ReposList open={open}>
            {repos.map((repo) => {
              const showDescription = repo.description || "No description";

              return (
                <RepoListItem>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    <h4>{repo.name}</h4>
                    <p>{showDescription}</p>
                  </a>
                </RepoListItem>
              );
            })}
          </ReposList>
        </ListContainer>
      )}
    </ReposContainer>
  );
};

export default UserRepos;
