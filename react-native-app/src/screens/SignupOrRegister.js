import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AuthContext from '../context/AuthContext';
import { widthPercentageToDP as percentageWidth, heightPercentageToDP as percentageHeight } from 'react-native-responsive-screen';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import Snackbar from 'react-native-snackbar';

const SignupOrRegister = ({ navigation }) => {
  const netInfo = useNetInfo();
  const { signInWithGoogle, signInAnonymously } = React.useContext(AuthContext);
  const [allButtonsDisabled, setAllButtonsDisabled] = useState(false);

  useEffect(() => {
    if (netInfo.details !== null && !netInfo.isConnected) {
      setAllButtonsDisabled(true);
      console.log('Displaying "no internet connection" snack');
      console.log({ netInfo });
      Snackbar.show({
        text: 'No internet connection, you can\'t log in.',
        duration: Snackbar.LENGTH_INDEFINITE,
      });
    }
    else {
      Snackbar.dismiss();
      setAllButtonsDisabled(false);
    }
  }, [netInfo]);

  const handleSignInWithGoogle = async () => {
    setAllButtonsDisabled(true);
    await signInWithGoogle();
    setAllButtonsDisabled(false);
  };

  const image = allButtonsDisabled ? require('../images/logo.png') : require('../images/logoGreen.png');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={image} />
      </View>
      <View style={styles.bodyContainer}>
        <Button
          disabled={allButtonsDisabled}
          iconContainerStyle={styles.googleIconContainer}
          testID={'googleButton'}
          icon={
            <AntDesign
              style={styles.googleIcon}
              name="google"
              size={percentageWidth('5%')}
              color="black"
            />
          }
          containerStyle={styles.googleContainer}
          buttonStyle={styles.google}
          titleStyle={styles.googleText}
          title="Join using Google"
          onPress={handleSignInWithGoogle}
        />
        <Button
          disabled={allButtonsDisabled}
          containerStyle={styles.signUpContainer}
          buttonStyle={styles.signUp}
          titleStyle={styles.signUpText}
          title="Join using email"
          onPress={() => navigation.navigate('Signup')}
        />
        <View style={styles.loginButtonContainer}>
          <Text style={styles.loginText}>Existing user?</Text>
          <Button
            title="LOGIN"
            testID="skipButton"
            disabled={allButtonsDisabled}
            titleStyle={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
            type="clear"
          />
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Wash your hands after touching your phone and before touching food.</Text>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', height: '100%', justifyContent: 'center' },
  logoContainer: { flex: 1, justifyContent: 'center' },
  logo: {
    height: percentageHeight('15%'),
    resizeMode: 'contain',
  },
  bodyContainer: { width: '80%', flex: 1 },
  title: { fontSize: percentageWidth('15%') },
  googleContainer: { marginVertical: percentageHeight('1%') },
  google: { backgroundColor: 'white' },
  googleText: { fontSize: percentageWidth('5%'), color: 'black' },
  googleIconContainer: { marginRight: percentageHeight('5%') },
  googleIcon: { paddingRight: percentageWidth('3%') },
  signUpContainer: { marginVertical: percentageHeight('1%') },
  signUpText: { fontSize: percentageWidth('5%') },
  signUp: { backgroundColor: 'green' },
  loginButtonContainer: { marginVertical: percentageHeight('3%') },
  loginText: { fontSize: percentageWidth('5%'), textAlign: 'center', color: 'grey' },
  loginButton: { color: 'green', fontSize: percentageWidth('7%') },
  skipButtonContainer: { position: 'absolute', bottom: percentageHeight('5%') },
  skipButton: { color: 'grey', fontSize: percentageWidth('5%') },
  footerContainer: { flex: 0.25, justifyContent: 'center', padding: 64 },
  footerText: { textAlign: 'center' },
});

export default SignupOrRegister;
