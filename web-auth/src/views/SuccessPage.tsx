import React, { useEffect } from "react";
import supabase from "../supabase/supabaseClient";
import { Flex } from "@chakra-ui/react";

export const SuccessPage = () => {
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
          throw error;
        }
        setUsers(data);
        // Handle the data here, e.g., update state or perform other actions
        console.log("Fetched data:", data);
      } catch (error) {
        // Handle errors here, e.g., show an error message
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <Flex>
      <div>Success!</div>
      {users.map((user, i) => (
        <div key={`user-${i}`}>{user.email}</div>
      ))}
    </Flex>
  );
};
