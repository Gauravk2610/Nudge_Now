import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import React, {useState} from 'react';
import axios from 'axios';

const Register = ({navigation}: any) => {
  const initalState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    const {name, email, password, confirmPassword} = form.fields;
    const errors: any = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Password does not match';
    }
    return errors;
  };

  const submitForm = async () => {
    try {
      const res = await axios.post(
        'https://gamification-test-repo-nabajit.onrender.com/users/register',
        form.fields,
      );
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User registered successfully',
        });
      console.log(res.data);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    const errors = formValidation();
    if (Object.keys(errors).length) {
      setForm({
        ...form,
        errors: errors,
      });
      return;
    }
    // navigation.navigate('Login');

    await submitForm();
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://th.bing.com/th/id/R.d1f48f1c0057092dc002894a4c3e501c?rik=Q6Fq7qMRTNeN8w&riu=http%3a%2f%2fih1.redbubble.net%2fimage.208539166.1691%2fflat%2c800x800%2c075%2cf.jpg&ehk=l7cwESwKsalFguMprdxhP8XSe0U%2b%2bbp8ALQ0pj5ybco%3d&risl=&pid=ImgRaw&r=0',
          }}
          resizeMode="contain"
          style={{
            width: 120,
            height: 120,
          }}
        />
        <Text style={styles.header}>Register</Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          style={{
            width: '100%',
            height: '100%',
            marginTop: 20,
            paddingHorizontal: 10,
          }}>
          {/* Register Form */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            {form.errors.name ? (
              <Text style={{color: 'red'}}>{form.errors.name}</Text>
            ) : null}
            <TextInput
              keyboardType="default"
              style={styles.input}
              onChangeText={value => handlChange('name', value)}
            />
            <Text style={styles.label}>Email</Text>
            {form.errors.email ? (
              <Text style={{color: 'red'}}>{form.errors.email}</Text>
            ) : null}
            <TextInput
              keyboardType="email-address"
              autoComplete="email"
              style={styles.input}
              onChangeText={value => handlChange('email', value)}
            />
            <Text style={styles.label}>Password</Text>
            {form.errors.password ? (
              <Text style={{color: 'red'}}>{form.errors.password}</Text>
            ) : null}
            <TextInput
              secureTextEntry
              autoComplete="password"
              style={styles.input}
              onChangeText={value => handlChange('password', value)}
            />
            <Text style={styles.label}>Confirm Password</Text>
            {form.errors.confirmPassword ? (
              <Text style={{color: 'red'}}>{form.errors.confirmPassword}</Text>
            ) : null}
            <TextInput
              secureTextEntry
              autoComplete="password"
              style={styles.input}
              onChangeText={value => handlChange('confirmPassword', value)}
            />
          </View>
          {/* Register Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Register;

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
    fontSize: 20,
    backgroundColor: '#ececec',
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    height: '100%',
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
