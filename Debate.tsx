import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { List } from 'react-native-paper';
import { Alert } from 'react-native';
type debateType = { id: string; title: string; };
function Debate( d :debateType) {
  async function clickButton() {
    await firestore()
      .collection('Debate')
      .doc(d.id)
      .update({
        
      });
      Alert.alert(d.id + ' is pressed')
  }

  return (
    <List.Item
      title={d.title}
      onPress={() => clickButton()}  
      left={props => (
        <List.Icon {...props} icon="pin" />
      )}
    />
  );
}

export default React.memo(Debate);