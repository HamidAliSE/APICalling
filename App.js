import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import axios from 'axios';

const App = () => {
  console.log('Rendering App');
  const [loading, setLoading] = useState(true);

  const [todo, setTodo] = useState({data: {}, error: ''});
  const [post, setPost] = useState({data: {}, error: ''});
  const [user, setUser] = useState({data: {}, error: ''});
  const [comment, setComment] = useState({data: {}, error: ''});

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos/1')
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
});

export default App;
