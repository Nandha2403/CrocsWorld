import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsBag, BsPerson } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import MegaMenu from "./MegaMenu";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../Redux/Authentication/action";

const Navbar = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { userID, name } = useSelector(({ authReducer }) => authReducer);
  const { cart, wishlist } = useSelector(({ cartReducer }) => cartReducer);

  const handleLogout = () => {
    localStorage.removeItem("UserResponseData");
    dispatch(logoutSuccess());
    toast({
      title: "Logout Successful",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (userID) {
      // dispatch()
    }
  }, [userID]);

  return (
    <Box
      position="sticky"
      top={"0"}
      zIndex={"100"}
      bg={"white"}
      boxShadow="0px 7px 7px -5px rgba(120,108,120,0.2)"
    >
      <Flex
        height={{ base: "3.2rem", md: "4.94rem" }}
        px={{ base: "1rem", md: "3rem" }}
        gap={"2rem"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link to={"/"}>
          <Box minW={"6rem"}>
            <Image
              src="https://i.ibb.co/3czhLFz/Edited-Logo.png"
              alt="logo"
              width={"9rem"}
              height={{ base: "3.2rem", md: "100%" }}
            />
          </Box>
        </Link>
        <MegaMenu />
        <Box
          minWidth={"10rem"}
          width={"30rem"}
          display={{ base: "none", lg: "block" }}
        >
          <Searchbar />
        </Box>
        <Flex gap={{ base: "1rem", md: "2rem" }} align={"center"}>
          <Popover>
            <PopoverTrigger>
              <Flex flexDir={"column"} align={"center"} cursor={"pointer"}>
                <Text>
                  {!userID ? (
                    <BsPerson fontSize={"1.26rem"} />
                  ) : (
                    <Avatar
                      bg={"blue.400"}
                      color={"white"}
                      name={name}
                      size="sm"
                    />
                  )}
                </Text>
                <Text
                  fontSize={"0.8rem"}
                  fontWeight="bold"
                  display={{ base: "none", md: "block" }}
                  color={"blackAlpha.600"}
                >
                  {!userID ? "Profile" : ""}
                </Text>
              </Flex>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader py="1rem"></PopoverHeader>
              <PopoverBody>
                <Flex flexDir={"column"} gap="3" textTransform={"capitalize"}>
                  {!userID ? (
                    <Link to="/login">
                      <Text
                        pl="2rem"
                        bg="gray.100"
                        borderRadius={"md"}
                        py="0.5rem"
                      >
                        Signin / Signup
                      </Text>
                    </Link>
                  ) : (
                    <Box
                      pl="2rem"
                      bg="gray.100"
                      borderRadius={"md"}
                      py="0.5rem"
                      textAlign={"center"}
                    >
                      <Text fontWeight={"800"}>Hello,</Text>
                      <Text>{name}</Text>
                    </Box>
                  )}

                  {userID && (
                    <Link to="/profile">
                      <Text pl="2rem">Profile</Text>
                    </Link>
                  )}

                  <Link to="/wishlist">
                    <Text pl="2rem">Wishlists</Text>
                  </Link>

                  <Link to="#">
                    <Text pl="2rem">contact us</Text>
                  </Link>
                  {userID && (
                    <Link>
                      <Button width="full" onClick={handleLogout}>
                        Logout
                      </Button>
                    </Link>
                  )}
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Link to={"/wishlist"}>
            <Flex flexDir={"column"} align={"center"} pos={"relative"}>
              <Text>
                <AiOutlineHeart fontSize={"1.26rem"} />
              </Text>
              <Text
                fontSize={"0.8rem"}
                fontWeight={"bold"}
                color={"blackAlpha.600"}
                // display={{ base: "none", md: "block" }}
              >
                Wishlist
                {userID && wishlist && (
                  <Flex
                    justify={"center"}
                    align="center"
                    pos={"absolute"}
                    top="-5px"
                    right="-2px"
                    width="20px"
                    height="20px"
                    color="white"
                    borderRadius={"50%"}
                    bg="pink.400"
                  >
                    {wishlist.length}
                  </Flex>
                )}
              </Text>
            </Flex>
          </Link>
          <Link to="/cart">
            <Flex flexDir={"column"} align={"center"} pos="relative">
              <Text>
                <BsBag fontSize={"1.26rem"} />
              </Text>
              <Text
                fontSize={"0.8rem"}
                fontWeight="bold"
                // display={{ base: "none", md: "block" }}
                color={"blackAlpha.600"}
              >
                Bag
                {userID && (
                  <Flex
                    justify={"center"}
                    align="center"
                    pos={"absolute"}
                    top="-5px"
                    right="-12px"
                    width="20px"
                    height="20px"
                    color="white"
                    borderRadius={"50%"}
                    bg="pink.400"
                  >
                    {cart.length}
                  </Flex>
                )}
              </Text>
            </Flex>
          </Link>
          <Box display={{ lg: "none" }}>
            <Sidebar userID={userID} handleLogout={handleLogout} />
          </Box>
        </Flex>
      </Flex>
      <Box padding={"8px"} display={{ lg: "none" }}>
        <Searchbar />
      </Box>
    </Box>
  );
};

export default Navbar;
