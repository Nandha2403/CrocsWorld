import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Tooltip, useToast } from "@chakra-ui/react";
import SingleProductImageSlider from "./SingleProductImageSlider";
import { addCartRequest, addWishlistRequest } from "../Redux/Cart/api";

const ProductsCard = React.memo(({ data }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const [selectedSize, setSlectedSize] = useState(null);
  const { cart, wishlist } = useSelector(({ cartReducer }) => cartReducer);
  const { userID, isAuth } = useSelector(({ authReducer }) => authReducer);
  const {
    id,
    title,
    offerPrice,
    originalPrice,
    discount,
    image,
    subCategory,
    rating,
    ratingCount,
    size,
  } = data;

  const handleData = (
    size,
    data,
    collection,
    addCollectionRequest,
    successMessage
  ) => {
    if (!isAuth) {
      toast({
        title: "Please Login",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 1000,
      });
      return;
    }

    if (!size) {
      toast({
        title: "Please Add the Size",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 1000,
      });
      return;
    }

    const alreadyAddedData = collection.filter((product) => {
      return product.productID === data.id && product.size === size;
    });

    if (alreadyAddedData.length > 0) {
      toast({
        title: `Product Already Added In ${successMessage}`,
        variant: "subtle",
        status: "error",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: `Adding Your Product`,
      status: "warning",
      isClosable: true,
      position: "top",
      duration: 1000,
    });

    const productDetail = {
      productID: data.id,
      size: size,
      image: data.image,
      offerPrice: data.offerPrice,
      quantity: 1,
      title: data.title,
      category: data.category,
      userID: userID,
      originalPrice: data.originalPrice,
    };

    dispatch(addCollectionRequest(userID, [...collection, productDetail])).then(
      (res) => {
        toast({
          title:`Product Added to ${successMessage}`,
          status:"success",
          isClosable:true,
          position:"top",
          duration:1000,
          
        })
      }
    );
  };
   const handleCartData=(size,data) =>{
    handleData(size,data,cart,addCartRequest,"Cart")
   }
   const handleWishlistData=(size,data) =>{
    handleData(size,data,wishlist,addWishlistRequest,"Whislist")
   }

  return (
    <Box
      cursor={"pointer"}
      className="shadow"
      transition={"all 0.3s"}
      height={{ base: "300px", md: "310px" }}
      width={{ base: "150px", md: "210px" }}
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
      boxShadow={"lg"}
      borderRadius={10}
      pb={4}
    >
      <Box>
        <SingleProductImageSlider
          images={image}
          rating={rating}
          ratingCount={ratingCount}
          id={id}
        />
      </Box>
      <Box px="0px" bg="white">
        <Text
          fontWeight={"600"}
          fontSize="0.94rem"
          pl="10px"
          width="100%"
          overflow={"hidden"}
          whiteSpace="nowrap"
          textOverflow={"ellipsis"}
        >
          {subCategory}
        </Text>
        <Box position={"relative"} bg="white">
          <Text
            fontSize={"0.9rem"}
            color="gray.700"
            pl="10px"
            width="100%"
            overflow={"hidden"}
            whiteSpace="nowrap"
            textOverflow={"ellipsis"}
          >
            {title.substring(0, 30)}
          </Text>
          <Flex
            height={!show && "0"}
            className="wishlistlayer"
            flexDir={"column"}
            align="center"
            position={"absolute"}
            py={"1rem"}
            pb="0"
            bottom={"0"}
            bg="white"
            width={"full"}
            zIndex={show ? "1" : "-100"}
          >
            <Flex display={!show && "none"}>
              <Tooltip label="ADD TO BAG" placement="left">
                <Button
                  size="sm"
                  colorScheme="blue"
                  height={10}
                  width={14}
                  mr={"2"}
                >
                  <img
                    width="20"
                    height="24"
                    src="https://img.icons8.com/android/24/shopping-bag.png"
                    alt="shopping-bag"
                    onClick={() => handleCartData(selectedSize, data)}
                  />
                </Button>
              </Tooltip>
              <Tooltip label="ADD TO WISHLIST" placement="right-start">
                <Button height={10} width={14} colorScheme="pink" ml={2}>
                  <img
                    width="20"
                    height="24"
                    src="https://img.icons8.com/ios-filled/24/like--v1.png"
                    alt="like--v1"
                    onClick={() => handleWishlistData(selectedSize, data)}
                  />
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
        </Box>
        <Text fontWeight={"bold"} fontSize="0.84rem" my="0.1rem" pl="10px">
          Rs. {offerPrice || 456}{" "}
          <Text
            as="span"
            textDecoration={"line-through"}
            fontWeight="300"
            fontSize="0.8rem"
          >
            Rs.{originalPrice}
          </Text>
          <Text as="span" color={"pink.400"} fontSize="0.7rem" px="4px">
            ({discount || "54%"}% off)
          </Text>
        </Text>
        <Select
          textAlign={"center"}
          placeholder="Sizes"
          width={"60%"}
          height={6}
          margin={"auto"}
          onChange={(e) => setSlectedSize(e.target.value)}
        >
          {size.map((el, index) => (
            <option key={index} value={el}>
              {el}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
});

export default ProductsCard;
