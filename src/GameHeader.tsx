import { HStack, Heading, Avatar, VStack, Box } from "@chakra-ui/react";

interface GameHeaderProps {
    user: any;
    opponent: any;
    playerID: Number | null;
}

/// #DC585B

const GameHeader = ({ user, opponent, playerID }: GameHeaderProps) => {
    if (!user || !opponent)
        return null;
    return (
        <HStack justifyContent="space-between" width="800px" marginBottom={5} flexDir={playerID === 1 ? "row" : "row-reverse"}>
            <HStack justifyContent="flex-start">
                {user.avatar && <Avatar src={user.avatar || ""} border="1px solid #D9D9D9" />}
               <VStack alignItems="flex-start" gap={1} width="120px">
               <Heading fontSize={20} color={playerID === 1 ? "#DC585B" : "#D9D9D9" }>
                    You
                </Heading>
                <HStack>
                       <Box backgroundColor="#F74E3B" height="20px" width="20px" borderRadius="full"></Box> 
                       <Box backgroundColor="teal" height="20px" width="20px" borderRadius="full"></Box> 
                       <Box backgroundColor="teal" height="20px" width="20px" borderRadius="full"></Box> 
                    </HStack>
               </VStack>
            </HStack>
            <HStack>
                {opponent.avatar && <Avatar src={opponent.avatar || ""} border="1px solid #D9D9D9" />}
                <VStack alignItems="flex-start" gap={1} width="120px">
                    <Heading fontSize={20} color={playerID === 2 ? "#DC585B" : "#D9D9D9" }>
                        {(opponent.username && opponent.username) || ""}
                    </Heading>
                    <HStack>
                       <Box backgroundColor="teal" height="20px" width="20px" borderRadius="full"></Box> 
                       <Box backgroundColor="#F74E3B" height="20px" width="20px" borderRadius="full"></Box> 
                       <Box backgroundColor="teal" height="20px" width="20px" borderRadius="full"></Box> 
                    </HStack>
                </VStack>
            </HStack>
        </HStack>
    );
};

export default GameHeader;
