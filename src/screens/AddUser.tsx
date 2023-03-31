import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Toast} from 'react-native-toast-message/lib/src/Toast';
  import axios from 'axios';
  import {selectAuth, setAuth, setNudgeId} from '../redux/features/authSlice';
  import {useDispatch, useSelector} from 'react-redux';
  
  const AddUser = ({navigation}: any) => {
    const dispatch = useDispatch();
  
    const {token} = useSelector(selectAuth)

    const initalState = {
      email: '',
      externalId: '',
      name: '',
    };
  
    const [form, setForm] = useState({
      fields: initalState,
      errors: initalState,
    });
  
    const handlChange = (name: string, value: string) => {
      setForm({
        ...form,
        fields: {
          ...form.fields,
          [name]: value,
        },
        errors: {
          ...form.errors,
          [name]: '',
        },
      });
    };
  
    const formValidation = () => {
      const {email, externalId, name} = form.fields;
      const errors: any = {};
      if (!name) {
        errors.name = 'Name is required';
      }
      if (!email) {
        errors.email = 'Email is required';
      }
      if (!externalId) {
        errors.externalId = 'externalId is required';
      }
      return errors;
    };
  
    const addUser = async () => {
        console.log(token, form.fields)
        try {
            const res = await axios.post(
              'https://gameserver.api.nudgenow.in/users',
              {
                name: form.fields.name,
                email: form.fields.email,
                externalId: form.fields.externalId,
              },
              {
                headers:{
                    Authorization:
                      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDA3MzYwMjU0NzBiNzVlNmFlOTIwMjAiLCJuYW1lIjoiTmFiYWppdCIsImVtYWlsIjoibmFiYWppdEBudWRnZW5vdy5pbiIsImlhdCI6MTY3ODE5NDE3OH0.nE3IFf2Mg4bnr8dRcj38mK6H6-utNREQOTTRi95OsF0',
                  },
              },
            );
            dispatch(setNudgeId(res.data))
            console.log(res.data);
            navigation.goBack()
        }
        catch (err) {
            console.log(err)
        }
    };
  
    const submitForm = async () => {
      try {
        const res = await axios.post(
          'https://api.nudgenow.in/clients/login',
          form.fields,
        );
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'User registered successfully',
        });
        console.log(res.data);
        await addUser();
        setTimeout(() => {
          dispatch(setAuth(res.data));
          navigation.navigate('Home');
        }, 400);
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong',
        });
      }
    };
  
    const handleLogin = async () => {
      const errors = formValidation();
      if (Object.keys(errors).length) {
        setForm({
          ...form,
          errors: errors,
        });
        return;
      }
    //   await submitForm();
      await addUser();

      // navigation.navigate('Home');
    };
  
    const {errors} = form;
  
    return (
      <SafeAreaView style={styles.sectionContainer}>
        <Toast />
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://www.nudgenow.in/assets/Logo.png',
            }}
            resizeMode="contain"
            style={{
              width: '50%',
              height: 140,
            }}
          />
          <Text style={styles.header}>Add External User</Text>
          <ScrollView
            // contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            style={{
              width: '100%',
              height: '100%',
              marginTop: 20,
              paddingHorizontal: 10,
            }}>
            {/* Login Form */}
            <View style={styles.formContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                keyboardType="default"
                autoComplete="name"
                style={styles.input}
                onChangeText={text => handlChange('name', text)}
              />
              {errors?.name && <Text style={styles.error}>{errors?.name}*</Text>}
              <Text style={styles.label}>Email</Text>
              <TextInput
                keyboardType="email-address"
                autoComplete="email"
                style={styles.input}
                onChangeText={text => handlChange('email', text)}
              />
              {errors?.email && (
                <Text style={styles.error}>{errors?.email}*</Text>
              )}
              <Text style={styles.label}>External Id</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => handlChange('externalId', text)}
              />
              {errors?.externalId && (
                <Text style={styles.error}>{errors?.externalId}*</Text>
              )}
            </View>
            {/* Register Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Add user</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  
  export default AddUser;
  
  const styles = StyleSheet.create({
    sectionContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container: {
      paddingTop: 6,
      paddingHorizontal: 24,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000',
    },
    input: {
      height: 40,
      paddingHorizontal: 16,
      borderRadius: 5,
      fontSize: 18,
      backgroundColor: '#ececec',
      width: '100%',
      marginBottom: 5,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 5,
    },
    error: {
      fontSize: 16,
      color: '#bc2323',
      marginBottom: 6,
    },
    formContainer: {
      width: '100%',
      marginBottom: 20,
    },
    buttonContainer: {
      width: '100%',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#000',
      padding: 12,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  