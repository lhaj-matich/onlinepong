import { HStack, Heading, Avatar, VStack, Icon } from "@chakra-ui/react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

interface GameHeaderProps {
    score: any;
    user: any;
    opponent: any;
    playerID: number;
}

const GameHeader = ({ score, user, opponent, playerID }: GameHeaderProps) => {
    if (!user || !opponent) return null;
    return (
        <HStack
            justifyContent="space-between"
            width="800px"
            marginBottom={5}
            flexDir={playerID === 1 ? "row" : "row-reverse"}
        >
            <HStack justifyContent="flex-start">
                {user.avatar && <Avatar src={user.avatar || ""} border="1px solid #D9D9D9" />}
                <VStack alignItems="flex-start" gap={1} width="120px">
                    <Heading fontSize={18} color={playerID === 1 ? "#DC585B" : "#D9D9D9"}>
                        You
                    </Heading>
                    <HStack gap={1} height="26px" minWidth="110px" backgroundColor="#252932" borderRadius={12}>
                        {score["1"] && score["2"] && score[playerID].map((scoreItem: string, index: number) => (
                            <Icon
                                key={index}
                                boxSize="24px"
                                color={scoreItem === "W" ? "#00C851" : "#ff4444"}
                                as={scoreItem === "W" ? AiFillCheckCircle : AiFillCloseCircle}
                            />
                        ))}
                    </HStack>
                </VStack>
            </HStack>
            <HStack>
                {opponent.avatar && <Avatar src={opponent.avatar || ""} border="1px solid #D9D9D9" />}
                <VStack alignItems="flex-start" gap={1} width="120px">
                    <Heading fontSize={18} color={playerID === 2 ? "#DC585B" : "#D9D9D9"}>
                        {(opponent.username && opponent.username) || ""}
                    </Heading>
                    <HStack gap={1} height="26px" minWidth="110px" backgroundColor="#252932" borderRadius={12}>
                        {score["1"] && score["2"] && score[playerID === 1 ? playerID + 1 : playerID - 1].map((scoreItem: string, index: number) => (
                            <Icon
                                key={index}
                                boxSize="24px"
                                color={scoreItem === "W" ? "#00C851" : "#ff4444"}
                                as={scoreItem === "W" ? AiFillCheckCircle : AiFillCloseCircle}
                            />
                        ))}
                    </HStack>
                </VStack>
            </HStack>
        </HStack>
    );
};

export default GameHeader;
