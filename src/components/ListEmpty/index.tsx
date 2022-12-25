import { Container, Message } from './styles';

type Props = {
    message: string;
}

function ListEmpty({ message }: Props) {
    return (
        <Container>
            <Message>{message}</Message>
        </Container>
    );
}

export { ListEmpty }
