import React from "react";
import { Box, Text } from "rebass";

export const ResumeHeader = (props) => {
  console.log(props);
  return (
    <Box width="100%" backgroundColor="#e0e0e0" height={250} p={[2, 0, 0, 4]}>
      <Text fontSize={7}>
        Hi, I am <span style={{ fontWeight: "bold" }}>{props.name}</span> <br />
        Frontend expert
      </Text>
      <Text fontSize={3} color="#ff450d">
        {/* Date(OCTOBER 1979) will have a Helper function which will be made after API is implemented */}
        {props.city} Region - NL - OCTOBER 1979
      </Text>
    </Box>
  );
};
