import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native';

import { Container } from './styles'

function Input({ ...rest }: TextInputProps) {
  const { COLORS } = useTheme();

  return (
    <Container
      placeholderTextColor={COLORS.GRAY_300}
      {...rest} 
    />
  );
}

export { Input }
