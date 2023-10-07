import { Box, Link } from "@chakra-ui/react";

const Login = () => {
    return (
        <Box
            backgroundColor="#252932"
            height="100vh"
            width="100vw"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Link
                href="http://localhost:3000/auth/42/login"
                _hover={{ textStyle: "none" }}
                borderRadius={12}
                padding="10px 20px"
                fontSize="25px"
                backgroundColor="#DC585B"
                color="#252932"
            >
                Login 42
            </Link>
        </Box>
    );
};

export default Login;
