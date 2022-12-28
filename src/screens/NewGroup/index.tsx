import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';

import { Container, Content, Icon } from './styles'
import { Input } from '@components/Input';

function NewGroup() {
  const navigation = useNavigation();

  function handleCreateGroup() {
    navigation.navigate('players', { group: 'Rocket' });
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
