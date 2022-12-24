import { Container, Title, Subtitle } from './styles';

type Props = {
    title: string;
    subtitle: string;
}

function Highlight({ title, subtitle }: Props) {
    return (
        <Container>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
        </Container>
    );
}

export { Highlight }
