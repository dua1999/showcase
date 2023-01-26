import { get } from "@vueuse/core";
import axios from "axios";

const getUsers = async(limit, skip) => {
    const users =await axios.get('https://dummyjson.com/users?limit=&skip=&select=firstName,age');
    return users.data.users;
};

export default getUsers;