import React, { useState, useMemo } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import { TextField } from '../TextField';
import { PageTitle } from '../PageTitle';
import { PAGES_DATA } from '../../pages/constans';
import { HeaderContainer, InputWrapper } from './Header.styled';

const Header = ({ onGetQuery }) => {
  const location = useLocation();
  const match = useMatch('/user/*');
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const pageTitle = useMemo(() => {
    const currentPageData = PAGES_DATA.find(({ pathname }) => {
      console.log(pathname);
      return pathname === location.pathname || match?.pattern?.path;
    });

    if (currentPageData.pathname === '/search') {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }

    return currentPageData.title;
  }, [location.pathname, match]);

  const handleOnChange = ({ target: { value } }) => {
    setQuery(value);
    onGetQuery(value);
  };

  return (
    <HeaderContainer>
      <PageTitle title={pageTitle} />
      {showSearch && (
        <InputWrapper>
          <TextField name="search" value={query} onChange={handleOnChange} />
        </InputWrapper>
      )}
    </HeaderContainer>
  );
};

export default Header;
