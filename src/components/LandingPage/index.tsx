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
import { FlipWords } from "../../animations/flip-words";
import Lottie from "lottie-react";
import ICON from "../../animations/GIF/home-icon.json";

const words = [
  {
    text: "Easily",
    className: "text-white sm:text-4xl",
  },
  {
    text: "raise",
    className: "text-white sm:text-4xl",
  },
  {
    text: "funds",
    className: "text-white sm:text-4xl",
  },
  {
    text: "on",
    className: "text-white sm:text-4xl",
  },
  {
    text: "ZetaChain.",
    className: "text-purple-500 dark:text-purple-500 sm:text-4xl",
  },
];

function LandingPage() {
  const navigate = useNavigate();
  const words_ = ["crowd funds", "manage NFT’s", "manage your balances"];
  const handleClick = async () => {
    navigate("profile");
  };

  return (
    <Box
      h="100vh"
      display="flex"
      alignItems="space-evenly"
      flexDirection={"column"}
    >
      <BackgroundBeams />
      <Navbar />
      <Flex
        mt={{ md: "1%" }}
        justify="center"
        align="center"
        flexDirection={{ base: "column", md: "row" }}
        mx={{ sm: "auto", md: "5%" }}
        h="80vh"
      >
        {/* left side */}
        <Flex
          gap={4}
          flexDir="column"
          justify={{ base: "center", md: "flex-start" }}
          align={{ base: "center", md: "flex-start" }}
          w={{ base: "90%", md: "60%" }}
          mt={{  md: 0 }}
        >
          <Show above="md">
          <div className="">
            <TypewriterEffectSmooth words={words} />
          </div>
          </Show>
          <Show below="md">
          <Flex fontWeight={700} fontSize="2xl">
          <Text>Easily raise funds on &nbsp;</Text>
          <Text className="text-purple-500">ZetaChain</Text>
          </Flex>
</Show>

          <div className="sm:text-sm md:text-2xl font-montserrat font-normal text-purple-400 dark:text-purple-700 ">
            Get
            <FlipWords className="text-white" words={words_} />
            on Zetachain{" "}
          </div>

          <Hide below="md">
            <Button
              mt={10}
              cursor="pointer"
              borderRadius={"10px"}
              borderColor="purple"
              variant={"purple"}
              // px={2}
              py={1}
              maxW={"30%"}
              // fontSize="24px"
              size="lg"
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
          w={{ base: "60%", md: "40%" }}
          mt={{ base: 8, md: 0 }}
        >
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
              Get Started
            </Button>
          </Show>
        </Flex>
      </Flex>
      <Box h="10vh">
        <Footer />
      </Box>
    </Box>
    // </BackgroundBeamsWithCollision>
  );
}

export default LandingPage;
