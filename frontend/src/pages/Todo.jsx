import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Table from "../components/Table";
import { Box, Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { addToDo, getAllToDo, updateToDo,deleteToDo } from "../utils/HandleApi";
const Todo = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const [title, setTitle] = useState("");
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")
  const toast = useToast();
  const history = useHistory();
  const [description, setDescription] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      const Token = userinfo ? userinfo.token : "";

      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${Token}`,
        },
      };
      if (query.length === 0) {
        try {
          const res = await axios.get(`https://todoass.onrender.com/api/todo/`, config);
          setData(res.data);
        } catch (error) {
          toast({
            title: error.message,
            description: error.response.data.message,
            status: "error",
            duration: 1000,
            isClosable: true,
            position: "bottom",
          });
          history.push("/");
        }
      } else {
        try {
          const res = await axios.get(`https://todoass.onrender.com/api/todo/search?q=${query}`, config);
          setData(res.data);
        } catch (error) {
          toast({
            title: error.message,
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          history.push("/");
        }
      }
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);


  const updateMode = (_id, title,description) => {
    setIsUpdating(true)
    setTitle(title)
    setDescription(description)
    setToDoId(_id)
  }

  return (
    <div className="app">
      <Box
        display={"flex"}
        justifyContent={"center"}
        p={3}
        bg={"white"}
        w="100%"
        margin={"40px 0px 20px 0px"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text fontSize={"4xl"} fontFamily={"work sans"}>
          ToDo App
        </Text>
        <Button style={{
          marginLeft:"50%"
        }} colorScheme='blue' onClick={()=>{
          localStorage.clear();
          toast({
            title: "Log out Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          history.push("/")

        }} >Log Out</Button>
      </Box>
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

      <div className="top">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div
          className="add"
          onClick={
            isUpdating
              ? () => updateToDo(toDoId, 
                title,
                setTitle,
                description,
                setDescription,
                setData, setIsUpdating)
              : () => addToDo( title,
                setTitle,
                description,
                setDescription,
                setData)
          }
        >
          {isUpdating ? "Update" : "Add"}
        </div>
      </div>

      <div className="list">
        {data.map((item) => (
          <Table
            key={item._id}
            title={item.title}
            description={item.description}
            updateMode={() => updateMode(item._id, item.title,item.description)}
            deleteToDo={() => deleteToDo(item._id, setData)}
          />
        ))}
      </div>
     
    </div>
  );
};

export default Todo;
