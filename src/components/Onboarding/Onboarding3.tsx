import React from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import { useAccount, useWriteContract, BaseError, useConnect } from "wagmi";
import contractAbi from "../../contract/CrowdFunding-abi.json";
import { config } from "../../utils/wagmi";
import { zetachainAthensTestnet } from "viem/chains";
import { injected } from "wagmi/connectors";

const contractAddress = "0x310f934b1bc2E40b1b9Acce4895574e79DD716F8";

function Onboarding3() {
  const { bio, tags, amount, setBio, initUser } = React.useContext(AppContext);
  const navigate = useNavigate();
  const { address } = useAccount();
  const { writeContract, data, error, writeContractAsync } = useWriteContract({
    config,
  });
  const { connectAsync } = useConnect();
  // console.log(BaseError, "data", data, error, "address  ===>", address);

  // const handleCreateUser = () => {
  //   // initUser();
  //   writeContract({
  //     abi: contractAbi.abi,
  //     address: contractAddress,
  //     functionName: "create",
  //     args: [bio.name, bio.description, Number(amount), ["tags"]],
  //   });
  // };

  const handleCreateUser = async () => {
    try {
      if (!address) {
        await connectAsync({
          chainId: zetachainAthensTestnet.id,
          connector: injected(),
        });
      }

      const data = await writeContractAsync({
        chainId: zetachainAthensTestnet.id,
        address: contractAddress, // change to receipient address
        functionName: "create",
        abi: contractAbi.abi,
        args: [bio.name, bio.description, Number(amount), ["tags"]],
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Box>
        <Text fontSize="32px" fontWeight={600}>
          Create an Account
        </Text>
        <Text pt={4} fontSize="16px">
          funding are 100 percent on-chain, secure and tamper-proof on the
          solana blockchain. You can fund with any of the solana tokens but
          primarily with solana
        </Text>
      </Box>
      {/* put your details */}
      <Flex flexDirection="column" gap={3} pt={4} w={"100%"}>
        <Text my={3}>Name</Text>
        <Input
          value={bio.name}
          onChange={(e) =>
            setBio({
              ...bio,
              name: e.target.value,
            })
          }
          name="name"
          placeholder="what is your name"
        />
        <Text my={3}>Description</Text>
        <Textarea
          value={bio.description}
          onChange={(e) =>
            setBio({
              ...bio,
              description: e.target.value,
            })
          }
          placeholder="write a short reason for your solana funding"
        />
      </Flex>

      <Flex justify="flex-end" mt={8}>
        <Button
          py={7}
          px={5}
          color="white"
          bgColor="primary.50"
          onClick={handleCreateUser}
          isDisabled={bio.name.length < 3 && bio.description.length < 3}
        >
          Create
        </Button>
      </Flex>
    </Box>
  );
}

export default Onboarding3;
