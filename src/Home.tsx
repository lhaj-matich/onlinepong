import { Avatar, Box, Button, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import image from "./assets/logo.png";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

interface NavBarProps {
    user: any;
}

interface MatchMade {
    user: any;
    opponent: any;
}

const NavBar = ({ user }: NavBarProps) => {
    return (
        <HStack justifyContent="space-between" padding="20px">
            <Image src={image} width="110px" height="55px" />
            <HStack>
                <Avatar src={user.avatar} />
                <Heading fontSize="24px" color="#d9d9d9">
                    {user.username}
                </Heading>
            </HStack>
        </HStack>
    );
};

const MatchMade = ({user, opponent}: MatchMade) => {
    return (
        <HStack backgroundColor="#1D222C" padding={10} borderRadius={12}>
            <VStack width="150px">
                <Avatar src={user.avatar} />
                <Heading fontSize="24px" color="#d9d9d9">
                    You
                </Heading>
            </VStack>
            <Heading fontSize="50px" color="#dc585b">VS</Heading>
            <VStack width="150px">
                <Avatar src={opponent.avatar} />
                <Heading fontSize="24px" color="#d9d9d9">
                    {opponent.username}
                </Heading>
            </VStack>
        </HStack>
    );
};

const Home = () => {
    const [user, setUser] = useState({});
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(true);
    const [matchMade, setMatch] = useState(null);
    const socket = io("http://localhost:3000/game", {
        transports: ["websocket"],
        auth: {
            token: "Bearer " + Cookies.get("jwt"),
        },
    });

    useEffect(() => {
        socket.on("connect", () => {
            if (!socket.connected) {
                setMessage("Error connecting to the sockets server");
                setVisible(false);
            }
        });

        socket.on("onGoingMatch", () => {
            setMessage("You cannot join the queue you already in game session");
            setVisible(false);
        });

        socket.on("joinedGameQueue", () => {
            console.log("Joined");
            setMessage("Waiting for other players");
            setVisible(false);
        });

        socket.on("matchMade", (data) => {
            console.log(data);
            setMatch(data);
        })

        axios
            .get("http://127.0.0.1:3000/users/me", { withCredentials: true })
            .then((res) => {
                setUser(res.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const handleJoinQueue = () => {
        if (!socket.connected) {
            return setMessage("Error connecting to the game server please refresh...");
        }
        setVisible(false);
        socket.emit("gameJoinQueue");
    };

    return (
        <Box height="100vh" width="100vw" backgroundColor="#252932">
            <NavBar user={user} />
            <Box height="85%" display="flex" justifyContent="center" alignItems="center" position="relative">
                <Text
                    color="#d9d9d9"
                    fontSize="24px"
                    transform="translate(50%, -50%)"
                    position="absolute"
                    top="50%"
                    right="50%"
                    zIndex="4"
                >
                    {message}
                </Text>
                {visible && (
                    <Button fontSize="32px" padding="20px 30px" onClick={handleJoinQueue}>
                        Join Queue
                    </Button>
                )}
                { matchMade && <MatchMade user={user} opponent={matchMade} />}
            </Box>
        </Box>
    );
};

export default Home;
