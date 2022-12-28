import { useNavigation } from '@react-navigation/native';

import { 
    Container, 
    BackButton,
    BackIcon,
    Logo,
} from './styles';

import logoImg from '@assets/logo.png';

type Props = {
    showBackButton?: boolean;
}

function Header({ showBackButton = false }: Props) {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.navigate('groups');
    }

    return (
        <Container>
            {
                showBackButton && 
                <BackButton onPress={handleGoBack}>
                    <BackIcon />
                </BackButton>
            }
            <Logo source={logoImg}/>
        </Container>
    )
}

export { Header }
