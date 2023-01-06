import {  useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Loading } from '@components/Loading';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';


import { Container } from './styles';
import { groupGetAll } from '@storage/group/groupGetAll';

function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  function handleGroups(group: string) {
    navigation.navigate('players', { group });
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const data = await groupGetAll();

      setGroups(data);
     
    } catch(error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      <Highlight 
        title='Turmas'
        subtitle='jogue com sua turma'
      />
      {
        isLoading ? 
          <Loading /> :
          <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleGroups(item)}/>
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message='Que tal cadastrar a primeira turma?'/>
          )}
        />
      }
      <Button 
        title='Criar Nova Turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}

export { Groups }
