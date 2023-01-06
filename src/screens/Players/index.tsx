import { useState, useEffect, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO';

import { addPlayerByGroup } from '@storage/players/addPlayerByGroup';
import { getPlayersByGroupAndTeam } from '@storage/players/getPlayerByGroupAndTeam';
import { removePlayerByGroup } from '@storage/players/removePlayerByGroup';
import { removeGroupByName } from '@storage/group/removeGroupByName';

import { Header } from '@components/Header';
import { Loading } from '@components/Loading';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();

  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);

      const playersByTeam = await getPlayersByGroupAndTeam(group, team);

      setPlayers(playersByTeam);

    } catch(error) {
      Alert.alert('Jogadores', 'Não foi possível carregar as pessoas do time selecionado');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddPlayer() {
    if (!newPlayerName.trim()) {
      return Alert.alert('Novo jogador', 'Informe o nome do jogador');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await addPlayerByGroup(newPlayer, group);
      fetchPlayersByTeam();

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');

    } catch(error) {
      if (error instanceof AppError) {
        Alert.alert('Novo jogador', error.message);
      } else {
        Alert.alert('Novo jogador', 'Não foi  possível adicionar o jogador');
      }
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch(error) {
      Alert.alert('Remover jogador', 'Não foi possível remover o jogador');
    }
  }

  async function groupRemove() {
    try {
      await removeGroupByName(group);
      navigation.navigate('groups');

    } catch(error) {
      Alert.alert('Turma', 'Não foi possível remover a turma');
    }
  }

  function handleRemoveGroup() {
    Alert.alert('Remover', 'Deseja remover o grupo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => groupRemove() }
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton/>
      <Highlight 
        title={group}
        subtitle='adicione a galera e separe os times'  
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder='Nome da pessoa'
          value={newPlayerName}
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer}/>
      </Form>
      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>
      {
        isLoading ? 
          <Loading /> :
          <FlatList
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <PlayerCard 
                name={item.name}
                onRemove={() => handleRemovePlayer(item.name)}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmpty message='Não há pessoas neste time'/>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { paddingBottom: 100 },
              players.length === 0 && { flex: 1 }
            ]}
          />
      }
      <Button 
        title='Remover turma'
        type='SECONDARY'
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}

export { Players }
