import { HStack, Heading, Avatar, VStack } from "@chakra-ui/react";

const GameHeader = () => (
    <HStack justifyContent="space-between" width="800px" marginBottom={5}>
        <HStack justifyContent="flex-start">
            <Avatar
                src="https://cdn.intra.42.fr/users/711486184927ed4435f940616622740e/yait-iaz.jpg"
                border="3px solid #DC585B"
            />
            <Heading fontSize={20} color="#DC585B">
                You
            </Heading>
        </HStack>
        <HStack>
            <Avatar
                src="https://cdn.intra.42.fr/users/3b86420766f725922024d5ace6c6e5be/ochoumou.jpg"
                border="3px solid #D9D9D9"
            />
            <VStack>
                <Heading fontSize={20} color="#D9D9D9">
                    Ochoumou
                </Heading>
            </VStack>
        </HStack>
    </HStack>
);

export default GameHeader;
