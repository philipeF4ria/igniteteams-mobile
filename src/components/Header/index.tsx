
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
    return (
        <Container>
            {
                showBackButton && 
                <BackButton>
                    <BackIcon />
                </BackButton>
            }
            <Logo source={logoImg}/>
        </Container>
    )
}

export { Header }
