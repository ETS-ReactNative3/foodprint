import { Image, View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import React, { useState, useEffect } from 'react';

import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';


// GraphQL schema for correction mutation
const POST_CORRECTION_MUTATION = gql`
mutation PostCorrectionMutation($name: String!) {
  postCorrection(name: $name) {
    product {
      name
    }
    carbonFootprintPerKg
  }
}
`;

const Correction = ({ meal, setMeal }) => {

  const [correctedName, setCorrectedName] = useState("");
  const [postCorrection, { loading: correctionLoading, error: correctionError, data: correctionData }] = useMutation(POST_CORRECTION_MUTATION);

  // Handle correction from input field
  const handleCorrection = async () => {
    try {
      await postCorrection({ variables: { name: correctedName } });
    } catch (err) {
      console.warn({ err });
    }
  };

  // Respond to changes in correction data (following correction)
  useEffect(() => {
    if (correctionData) {
      setMeal({
        ...meal,
        score: correctionData.postCorrection.carbonFootprintPerKg,
        description: correctionData.postCorrection.product.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correctionData]);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 2, justifyContent: 'center' }}>
        <Text h3 style={{ textAlign: 'center' }}>We couldn't find your item.</Text>
      </View>
      <View style={{ flex: 2.5, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ height: 200, width: 200 }}
          source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/fc4a1059120725.5a15c9fa08f78.gif' }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 22, textAlign: 'center', marginHorizontal: 20 }}>Let us know what it was, so we can improve our
          app:</Text>
      </View>
      <View style={{ flex: 1.5 }}>
        <View style={{ margin: 20 }}>
          <Input
            placeholder="Cucumber"
            onChangeText={value => setCorrectedName(value)}
            onSubmitEditing={handleCorrection}
          />
        </View>
      </View>
    </View>
  );
};

export default Correction;
