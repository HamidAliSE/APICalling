import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

import axios from 'axios';

const BaseURL = 'https://jsonplaceholder.typicode.com';

const TODOS = 'todos';
const POSTS = 'posts';
const USERS = 'users';
const ALBUMS = 'albums';
const PHOTOS = 'photos';
const COMMENTS = 'comments';

const ResourcePathGenerator = ({resource, id}) => {
  if (!id) {
    return `/${resource}`;
  }
  return `/${resource}/${id}`;
};

const EndPointGenerator = ({resource, id}) => {
  console.log('Resource: ', resource);
  const ResourcePath = ResourcePathGenerator({resource, id});
  console.log('End Point: ', `${BaseURL}${ResourcePath}`);
  return `${BaseURL}${ResourcePath}`;
};

const QueryParameters = '';

const App = () => {
  console.log('Rendering App');
  const [loading, setLoading] = useState(true);

  const [todo, setTodo] = useState({data: {}, error: ''});
  const [post, setPost] = useState({data: {}, error: ''});
  const [user, setUser] = useState({data: {}, error: ''});
  const [comment, setComment] = useState({data: {}, error: ''});

  useEffect(() => {
    axios
      .get(EndPointGenerator({resource: TODOS, id: 1}))
      .then(response => {
        setTodo(response.data);
        axios
          .get('https://jsonplaceholder.typicode.com/posts/1')
          .then(response => {
            setPost(response.data);
            axios
              .get('https://jsonplaceholder.typicode.com/comments/1')
              .then(response => {
                setComment(response.data);
                axios
                  .get('https://jsonplaceholder.typicode.com/users/1')
                  .then(response => {
                    setUser(response.data);
                    setLoading(false);
                  })
                  .catch(error => {
                    setLoading(false);
                    console.log(
                      '🚀 ~ file: App.js ~ line 30 ~ useEffect ~ error',
                      error,
                    );
                  });
              })
              .catch(error => {
                setLoading(false);
                console.log(
                  '🚀 ~ file: App.js ~ line 30 ~ useEffect ~ error',
                  error,
                );
              });
          })
          .catch(error => {
            setLoading(false);
            console.log(
              '🚀 ~ file: App.js ~ line 30 ~ useEffect ~ error',
              error,
            );
          });
      })
      .catch(error => {
        setLoading(false);
        console.log('🚀 ~ file: App.js ~ line 17 ~ useEffect ~ error', error);
      });
  }, []);

  const addTask = async () => {
    // With Fetch
    // fetch('https://jsonplaceholder.typicode.com/todos', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     userId: 1,
    //     title: 'API Calling',
    //     completed: false,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    //   .then(response => {
    //     console.log('response', response);
    //     return response.json();
    //   })
    //   .then(json => {
    //     console.log('json', json);
    //   });

    // With Axios
    try {
      const response = await axios.post(EndPointGenerator({resource: POSTS}), {
        method: 'post',
        data: {
          userId: 1,
          completed: false,
          title: 'API Calling',
        },
      });
      console.log('data: ', response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screen}>
      {loading ? (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <Text>Todo</Text>
            <Text>{`Title: ${todo.title}`}</Text>
            <Text>{`Completed: ${todo.completed}`}</Text>
          </View>
          <View style={{height: 10}} />
          <View style={styles.container}>
            <Text>Post</Text>
            <Text>{`Title: ${post.title}`}</Text>
          </View>
          <View style={{height: 10}} />
          <View style={styles.container}>
            <Text>Comment</Text>
            <Text>{`Name: ${comment.name}`}</Text>
            <Text>{`Email: ${comment.email}`}</Text>
          </View>
          <View style={{height: 10}} />
          <View style={styles.container}>
            <Text>User</Text>
            <Text>{`Name: ${user.name}`}</Text>
            <Text>{`Email: ${user.email}`}</Text>
          </View>
          <View style={{height: 10}} />
          <View style={styles.buttonContainer}>
            <Button title="Add Task" onPress={addTask} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container: {
    alignItems: 'center',

    padding: 10,
    marginHorizontal: 20,

    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
  },
});

export default App;
