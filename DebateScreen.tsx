import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {Appbar, TextInput, Button} from 'react-native-paper';
import Debate from './Debate';

type debateType = {id: string; title: string};

function DebateScreen() {
  const [debate, setDebate] = useState('');
  const [loading, setLoading] = useState(true);
  const [debates, setDebates] = useState([] as debateType[]);
  const ref = firestore().collection('Debate');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list: debateType[] = [];
      querySnapshot.forEach(doc => {
        const {title} = doc.data();
        list.push({
          id: doc.id,
          title,
        });
      });

      setDebates(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, [loading, ref]);

  if (loading) {
    return null; // or a spinner
  }

  async function addDebate() {
    await ref.add({
      title: debate,
    });
    setDebate('');
  }

  return (
    <>
      <Appbar>
        <Appbar.Content title={'열린 토론들'} />
      </Appbar>
      <FlatList
        style={{flex: 1}}
        data={debates}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Debate {...item} />}
      />
      <TextInput
        label={'토론할 주제와 내용을 입력하세요'}
        value={debate}
        onChangeText={setDebate}
      />
      <Button onPress={() => addDebate()}>새로운 토론 등록하기</Button>
    </>
  );
}

export default DebateScreen;
