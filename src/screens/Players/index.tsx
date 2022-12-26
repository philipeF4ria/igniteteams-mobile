import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';

import { Container, Form } from './styles';

function Players() {
  return (
    <Container>
      <Header showBackButton/>
      <Highlight 
        title='Nome do grupo'
        subtitle='adicione a galera e separe os times'  
      />

      <Form>
        <Input 
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />
        <ButtonIcon icon='add'/>
      </Form>
    </Container>
  );
}

export { Players }
