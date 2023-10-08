import { HStack, Heading, Avatar, VStack } from "@chakra-ui/react";

interface GameHeaderProps {
    user: any;
    opponent: any;
}

const GameHeader = ({ user, opponent }: GameHeaderProps) => {
    if (!user || !opponent)
        return null;
    return (
        <HStack justifyContent="space-between" width="800px" marginBottom={5}>
            <HStack justifyContent="flex-start">
                {user.avatar && <Avatar src={user.avatar || ""} border="1px solid #D9D9D9" />}
                <Heading fontSize={20} color="#D9D9D9">
                    You
                </Heading>
            </HStack>
            <HStack>
                {opponent.avatar && <Avatar src={opponent.avatar || ""} border="1px solid #D9D9D9" />}
                <VStack>
                    <Heading fontSize={20} color="#D9D9D9">
                        {(opponent.username && opponent.username) || ""}
                    </Heading>
                </VStack>
            </HStack>
        </HStack>
    );
};

export default GameHeader;
