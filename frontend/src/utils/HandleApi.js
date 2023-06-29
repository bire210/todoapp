import axios from "axios";

const baseUrl = "https://todoass.onrender.com/api";



const getAllToDo = async (setData) => {
    const Token = JSON.parse(localStorage.getItem("userInfo")).token;
const config = {
  headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${Token}`,
  },
};

  try {
    const res = await axios.get(`${baseUrl}/todo/`, config);
    setData(res.data);
  } catch (error) {
    alert(error.message);
  }
};

const addToDo = async (
  title,
  setTitle,
  description,
  setDescription,
  setData
) => {

    const Token = JSON.parse(localStorage.getItem("userInfo")).token;
const config = {
  headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${Token}`,
  },
};

  try {
    const res = await axios.post(
      `${baseUrl}/todo/`,
      {
        title,
        description,
      },
      config
    );
    getAllToDo(setData);
    setTitle("");
    setDescription("");
  } catch (error) {
    alert(error.message);
  }
};

const deleteToDo =async (id, setData) => {

const Token = JSON.parse(localStorage.getItem("userInfo")).token;
const config = {
  headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${Token}`,
  },
};

    try {
        const res = await axios.delete(`${baseUrl}/todo/${id}`,config);
         getAllToDo(setData);
    } catch (error) {
        alert(error.message);
    }
};

const updateToDo =async (toDoId, title, setTitle,description,setDescription,setData, setIsUpdating) => {
  const Token = JSON.parse(localStorage.getItem("userInfo")).token;
const config = {
  headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${Token}`,
  },
};
try {
  const res = await axios.put(`${baseUrl}/todo/${toDoId}`,{ _id: toDoId, title,description },config);
  setTitle("")
  setDescription("")
  setIsUpdating(false)
  getAllToDo(setData);
} catch (error) {
  alert(error.message);
}  
}


export { getAllToDo, addToDo,updateToDo, deleteToDo };
