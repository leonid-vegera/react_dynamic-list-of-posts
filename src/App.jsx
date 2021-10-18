/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';

import { getUsers } from './api/users';

const App = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [usersFromServer, setUsersFromServer] = useState(null);

  // const loadUsers = async () => {
  //   return await getUsers();
  // }

  useEffect(() => {
    getUsers()
      .then(result => {
        setUsersFromServer(result)
    })
  }, [])

  const changeValue = (event) => {
    setSelectedUserId(event.target.value);
  };

  const changePostId = (postId) => {
    setSelectedPostId(postId)
  }

  return (
    <div className="App">

      {!usersFromServer ? (
        <div className="App__sidebar">
          <Loader />
        </div>
      ) : (
        <>
          <header className="App__header">
            <label>
              Select a user: &nbsp;

              <select
                className="App__user-selector"
                value={selectedUserId}
                onChange={changeValue}
              >
                    {/* <option value="0">All users</option>
                <option value="1">Leanne Graham</option>
                <option value="2">Ervin Howell</option>
                <option value="3">Clementine Bauch</option>
                <option value="4">Patricia Lebsack</option>
                <option value="5">Chelsey Dietrich</option>
                <option value="6">Mrs. Dennis Schulist</option>
                <option value="7">Kurtis Weissnat</option>
                <option value="8">Nicholas Runolfsdottir V</option>
                <option value="9">Glenna Reichert</option>
                <option value="10">Leanne Graham</option> */}

                <option value="0">All users</option>
                {usersFromServer.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
          </header>

          <main className="App__main">
              <div className="App__sidebar">
                <PostsList
                  setUserPosts={setUserPosts}
                  userPosts={userPosts}
                  selectedUserId={+selectedUserId}
                  onChangePostId={changePostId}
                  selectedPostId={selectedPostId}
                />
              </div>

              <div className="App__content">
                {selectedPostId === 0 ? (
                  <div className="PostDetails">
                    <h2>No posts selected:</h2>
                  </div>
                ) : (
                  <PostDetails
                    selectedPostId={selectedPostId}
                  />
                )}
              </div>
          </main>
        </>
      )}
      
    </div>
  );
};

export default App;
