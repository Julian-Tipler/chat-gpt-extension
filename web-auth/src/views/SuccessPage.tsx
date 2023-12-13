import { useEffect } from "react";
import supabase from "../supabase/supabaseClient";
import { Flex } from "@chakra-ui/react";

export const SuccessPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
          throw error;
        }
        // Handle the data here, e.g., update state or perform other actions
        console.log("Fetched data:", data);
        
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        // Handle errors here, e.g., show an error message
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <div>Success!</div>
    </Flex>
  );
};
