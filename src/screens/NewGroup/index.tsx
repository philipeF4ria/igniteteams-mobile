import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';

import { Container, Content, Icon } from './styles'

function NewGroup() {
  return (
    <Container>
      <Header showBackButton/>
      <Content>
        <Icon />
        <Highlight 
          title='Nova turma'
          subtitle='crie a turma para adicionar pessoas'
        />
        <Button title='Criar'/>
      </Content>
    </Container>
  );
}

export { NewGroup }
