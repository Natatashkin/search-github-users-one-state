// import * as ghApi from '../../api/ghApi';
// console.log(ghApi);
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ghApi from '../../api/ghApi';
import { useUser } from '../../context/UserContext';
import { Button, TextField } from '../../components';
import { Form, ButtonControls } from './HomePage.styled';

const HomePage = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const [username, setUsername] = useState('');

  const handleChange = ({ target: { value } }) => {
    setUsername(value.trim());
  };

  const handleSkip = () => {
    navigate('/search');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await ghApi.getUser(username);
      console.log(response);
      setUserData(response);

      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
          <TextField
            name="username"
            onChange={handleChange}
            value={username}
            label="Enter your github username"
          />
        </div>

        <ButtonControls>
          <Button title="Submit" />
          <Button title="Skip" onClick={handleSkip} />
        </ButtonControls>
      </Form>
    </div>
  );
};

export default HomePage;
