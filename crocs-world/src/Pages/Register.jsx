import {
  Flex,
  Box,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  Stack,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import banner6 from "../files/banner-6.PNG";
import { BiUserPlus } from "react-icons/bi";
import { addingUserToDB, gettingUsersData } from "../Redux/Authentication/action";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  // Accessing the store
  const authData = useSelector((store) => store.authReducer);
  const { users } = authData;

  const handleRegistration = () => {
    setIsRegistering(true);
    const isUserPresent = users.filter((user) => {
      return user.userEmail === email;
    });

    if (isUserPresent.length > 0) {
      toast({
        title: "Email already exists",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsRegistering(false);

      return;
    }

    if (name && email && password) {
      const userDetails = {
        username: name,
        userEmail: email,
        password: password,
        wishlists: [],
        orders: [],
        cart: [],
      };
      dispatch(addingUserToDB(userDetails))
        .then((res) => {
          toast({
            title: "Register Successful Redirecting to Website....",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setIsRegistering(false);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          toast({
            title: "Something Went Wrong Successful",
            status: "error",
            duration: 500,
            isClosable: true,
            position: "top",
          });
          setIsRegistering(false);
        });
    }else{
      toast({
				title: "Please Provide All The Details",
				status: "warning",
				duration: 500,
				isClosable: true,
				position: "top",
			});
			setTimeout(() => {
				setIsRegistering(false);
			}, 500);
    }
  };

  useEffect(()=>{
    dispatch(gettingUsersData())
  },[dispatch])
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundImage={`url(${banner6})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        w="400px"
        p={8}
        boxShadow="md"
        bg="rgba(255, 255, 255, 0.8)"
        rounded="md"
      >
        <Stack spacing={4}>
          <Text textAlign="center">
            Please Register And Get Exciting Offers!
          </Text>
          <Box>
            <Stack>
              <FormControl id="name" isRequired>
                <InputGroup>
                  <InputLeftAddon
                    children="Name"
                    paddingLeft={"31px"}
                    paddingRight={"31px"}
                  />
                  <Input
                    placeholder="Enter your name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="email" isRequired>
                <InputGroup>
                  <InputLeftAddon
                    children="Email"
                    paddingLeft={"32px"}
                    paddingRight={"32px"}
                  />
                  <Input
                    placeholder="Enter your email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="password" isRequired>
                <InputGroup>
                  <InputLeftAddon children="Password" />
                  <Input
                    placeholder="Enter a password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack>
                <Button
                  onClick={handleRegistration}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  width={"xs"}
                  m={"auto"}
                  isLoading={isRegistering}
                  loadingText="Signing Up"
                  leftIcon={<BiUserPlus />}
                >
                  Sign up
                </Button>
              </Stack>

              <Stack pt={6}>
              <ReactLink to="/login">
									<Text align={"center"}>
										Already a user ? <span style={{ color: "red" }}>Login</span>
									</Text>
								</ReactLink>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Register;
