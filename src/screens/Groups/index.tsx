import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import { Container } from './styles';

function Groups() {
  return (
    <Container>
      <Header />
      <Highlight 
        title='Turmas'
        subtitle='jogue com sua turma'
      />
    </Container>
  );
}

export { Groups }
