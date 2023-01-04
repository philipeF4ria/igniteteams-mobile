import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { Container, Content, Icon } from './styles'

function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleCreateGroup() {
    try {
      if (!group.trim()) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma')
      }

      await groupCreate(group);

      navigation.navigate('players', { group });
    } catch(error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Não foi possível criar novo grupo');
      }
    }
  }
  
  return (
    <Container>
      <Header showBackButton/>
      <Content>
        <Icon />
        <Highlight 
          title='Nova turma'
          subtitle='crie a turma para adicionar pessoas'
        />
        <Input 
          placeholder='Nome da turma'
          onChangeText={setGroup}
        />
        <Button 
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleCreateGroup}
        />
      </Content>
    </Container>
  );
}

export { NewGroup }
