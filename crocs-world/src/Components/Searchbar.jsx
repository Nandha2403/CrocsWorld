import axios from "axios"
import { Box, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Searchbar = () => {
  const [color, setColor] = useState("#edf2f2");
  const [text, setText] = useState("");
  const [show, setShow] = useState(false)
  const [data, setData] = useState([])

  const fetchData=useCallback(async ()=>{
    try {
      const res=await axios.get("https://crocs-api.onrender.com/products")
      setData(res.data)
    } catch (err) {
      console.log(err);
    }
  },[])

  useEffect(()=>{
    fetchData()
  },[fetchData])

  const filterData= useCallback(()=>{
    return data.filter((item)=> item.title.toLowerCase().includes(text.toLowerCase()))
  },[data,text])

  const filteredData= filterData()

  const handleInputChange = (e) => {
    setText(e.target.value);
  };
  const handleBlur=()=>{
    setColor("gray.100")
    setTimeout(()=>{
      setShow(false)
    },200)
  }

  const handleFocus=()=>{
    setColor("white")
    setShow(true)
  }

  const handleItemClick=()=>{
    setText("")
  }
  return (
    <Box bg={color} borderRadius={"md"} pos={"relative"}>
      <InputGroup>
        <InputLeftElement pointerEvents={"none"}>
          <FiSearch color="gray.500" />
        </InputLeftElement>
        <Input
          type="text"
          border="none"
          outline="none"
          value={text}
          onChange={handleInputChange}
          _focus={{
            boxShadow: "none",
            border: "1px solid #787373",
            outline: "none",
          }}
          placeholder="Search for products"
          onBlur={handleBlur}
					onFocus={handleFocus}
        ></Input>
      </InputGroup>
      {show && text.length>0&&(
        <Box 
        pos={"absolute"}
        top={"3.2rem"}
        width={"full"}
        maxH={"19.4rem"}
        bg={"gray.100"}
        borderRadius={"md"}
        overflowY={"auto"}
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
        >
          {filteredData.map((item)=>(
            <Link to={`/product/${item.id}`} key={item.title} onClick={handleItemClick} _hover={{textDecoration:"none", bg:"gray.200"}}>
              <Text padding={"8px"} pb={"1.7px"} pl={"15px"} borderBottomWidth={"1px"}>{item.title}</Text>
            </Link>
          ))}

        </Box>
      )}
    </Box>
  );
};

export default Searchbar;
