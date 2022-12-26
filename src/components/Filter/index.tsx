import { TouchableOpacityProps } from 'react-native';
import { Container, Title, FilterStyleProps } from './styles';

type Props = TouchableOpacityProps & FilterStyleProps & {
  title: string;
}

function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Container 
      isActive={isActive} 
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  )
}

export { Filter }
