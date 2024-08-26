import React from "react";
import {
  Box,
  Text,
  Flex,
  Container,
  Center,
  Button,
  Image,
  Heading,
  Show,
  Hide,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import toast from "react-hot-toast";
import Navbar from "../Navbar/Nav2";
import Footer from "../Footer";
import { BackgroundBeams } from "../../animations/background-beams";
import { TypewriterEffectSmooth } from "../../animations/typewriter-effect";
import Lottie from "lottie-react";
import ICON from "../../animations/GIF/home-icon.json";

const words = [
  {
    text: "Easily",
    className: "text-white",
  },
  {
    text: "raise",
    className: "text-white",
  },
  {
    text: "funds",
    className: "text-white",
  },
  {
    text: "on",
    className: "text-white",
  },
  {
    text: "ZetaChain.",
    className: "text-blue-500 dark:text-blue-500",
  },
];

function LandingPage() {
  const navigate = useNavigate();

  const handleClick = async () => {
    navigate("profile");
  };

  return (
    // <BackgroundBeamsWithCollision>
    <Box
      h="100vh"
      display="flex"
      alignItems="space-evenly"
      flexDirection={"column"}
    >
      <Navbar />
      <Flex
        mt={{ base: "5%", md: "1%" }}
        justify="center"
        align="center"
        flexDirection={{ base: "column", md: "row" }}
        mx={"2%"}
        h="80vh"
      >
        {/* left side */}
        <Flex
          mx={"8%"}
          flexDirection="column"
          justify={{ base: "center" }}
          w={{ md: "40%" }}
          flexWrap="wrap"
        >
          <TypewriterEffectSmooth words={words} />
          <Text mt={10} textAlign={{ base: "center", md: "left" }}>
            Get crowd funds, manage NFT’s and manage your zetachain balances
          </Text>

          <Hide below="md">
            <Button
              mt={10}
              borderRadius={"10px"}
              borderColor="purple"
              variant={"purple"}
              px={2}
              py={2}
              maxW={"20%"}
              fontSize="10px"
              onClick={() => {
                navigate("/connect-wallet");
              }}
            >
              Get Started
            </Button>
          </Hide>
        </Flex>

        {/* right side */}
        <Flex
          gap={4}
          flexDir="column"
          justify={{ base: "center", md: "flex-end" }}
          align={{ base: "center", md: "flex-end" }}
          w={{ base: "100%", md: "40%" }}
          mt={{ base: 8, md: 0 }}
        >
          {/* <Image
            w={{ base: 211, md: 448 }}
            h={{ base: 175, md: 371 }}
            src="/landing-page-logo.svg"
          /> */}
          <Lottie animationData={ICON} loop={true} />
          <Show below="md">
            <Button
              mt={10}
              borderRadius={"5px"}
              borderColor="purple"
              variant={"purple"}
              // px={2}
              py={2}
              onClick={() => {
                navigate("/connect-wallet");
              }}
            >
              Connect
            </Button>
          </Show>
        </Flex>
      </Flex>
      <Box h="10vh">
        <Footer />
      </Box>
      <BackgroundBeams />
    </Box>
    // </BackgroundBeamsWithCollision>
  );
}

export default LandingPage;
