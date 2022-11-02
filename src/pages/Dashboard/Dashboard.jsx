import React from 'react';
import { useUser } from '../../context/UserContext';
import * as ghApi from '../../api/ghApi';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user } = useUser();
  console.log(user);

  const getLimits = async () => {
    try {
      const response = await ghApi.getRateLimit();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLimits();
  }, []);
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
