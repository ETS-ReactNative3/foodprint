import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as percentageWidth, heightPercentageToDP as percentageHeight } from 'react-native-responsive-screen';
import {Button, Input, Overlay} from 'react-native-elements';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';


const Recipe = ( { route, navigation } ) => {
 const [ url, setURL ] = useState('');

 const handleSubmit = async () => {
   navigation.navigate('Feedback', { url: url });
 };


 return (
     <View style={ styles.container }>
       <Image
          source={require('../images/full-smiley.png')}
          style={ styles.image }
       />
       <Text style={ styles.text }>
         Want to know the carbon footprint of a meal you want to cook? Paste the URL of the
         recipe in the following field!
       </Text>
       <Input
           containerStyle={ styles.input }
           onChangeText = {value => setURL(value)}
       />
          <Button
              title="Submit"
              buttonStyle={ styles.button }
              containerStyle={ styles.buttonContainer }
              titleStyle={ styles.buttonTitle }
              onPress={handleSubmit}
          />
     </View>
 )
};

const styles = StyleSheet.create({
   container: { flex:1, justifyContent:'center', alignItems:'center', margin:percentageHeight('5%')},
   image: { height: percentageHeight('25%'), width:percentageWidth('45%'), marginBottom:percentageHeight('5%') },
   text: { fontSize:percentageWidth('4%') },
   input: { marginVertical:percentageHeight('2%') },
   button: { backgroundColor:'green', width:percentageWidth('30%'), height:45 },
   buttonContainer: { marginVertical:percentageHeight('2%') },
   buttonTitle: { fontSize:percentageWidth('5%') },
 });

export default Recipe;