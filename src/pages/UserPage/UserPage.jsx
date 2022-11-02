import React from 'react';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import * as ghApi from '../../api/ghApi';

const UserPage = () => {
  const location = useLocation();
  const { login } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setIsLoading] = useState(false);

  const getCurrentUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ghApi.getUser(login);
      setUserData(response);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [login]);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);
  console.log(userData);

  // Спросить Андрея как работает возврат запроса в инпут?????
  return (
    <div>
      {loading && <h3>Loading...</h3>}
      {userData?.login && (
        <>
          <Link to={location?.state?.from || '/search'}>"Back to search"</Link>
          <h2>{userData.name}</h2>
        </>
      )}
    </div>
  );
};

export default UserPage;
