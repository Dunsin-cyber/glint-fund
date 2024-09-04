import React, { useEffect } from "react";
import {
  Box,
  Text,
  Progress,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Input,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { Navigate, Router, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { TransactionT } from "../../redux/types";
import { ChatIcon } from "@chakra-ui/icons";
import { IoIosArrowBack } from "react-icons/io";
import SideNav from "../SideNav/HalfSide";
import { contractAddress, useGetACampaign } from "../../hooks";
import { useWriteContract, useAccount, useSimulateContract } from "wagmi";
// import { getAddress } from "@zetachain/protocol-contracts";
import toast from "react-hot-toast";
// import { zetachainAthensTestnet } from "viem/chains";
import contractAbi from "../../contract/CrowdFunding-abi.json";
import { parseEther } from "viem";
import { getTokenPrice } from "../../utils/tokenPrice";
// import { config } from "../../utils/wagmi";
import { getTokenConversion } from "../../utils/tokenPrice";

function Details() {
  const { id }: any = useParams();
  const { data, isLoading } = useGetACampaign(id);
  const navigate = useNavigate();
  const { address } = useAccount();
  const { error, writeContractAsync } = useWriteContract();
  const [value, setValue] = React.useState<number>(0);
  const [zetaVal, setZetaVal] = React.useState(0);
  const [eqSendingZeta, setEqSendingZeta] = React.useState(0);
  // Call the function with the token ID (e.g., "zetacoin" for Zeta)
  getTokenPrice("zetachain");

  const convert = async () => {
    var val = await getTokenConversion(Number(data[3]));
    setZetaVal(val);
  };
  if (data) {
    convert();
  }
  // const zetaAddress = getAddress("zrc20", "zeta_testnet");

  const handleDonate = async () => {
    try {
      if (eqSendingZeta <= 0) {
        return toast("checking convertion.. please wait");
      }
      const hash = await writeContractAsync({
        abi: contractAbi.abi,
        address: contractAddress,
        functionName: "donate",
        value: parseEther(`${eqSendingZeta}`),
        args: [id],
      });

      console.log(hash);
      toast.success("Donation Successful");
    } catch (err: any) {
      toast.error(err.message);
      return;
    }
  };

  const handleSendVal = async (valueString: string) => {
    setValue(+parse(valueString));
    const val = await getTokenConversion(value);
    setEqSendingZeta(val);
  };

  const format = (val: number) => `$` + val;
  const parse = (val: string) => val.replace(/^\$/, "");

  return (
    <SideNav>
      {data && (
        <Box mx={6}>
          <Flex my={6} justify="space-between">
            <Box onClick={() => navigate(-1)}>
              <IoIosArrowBack />
            </Box>

            <Text>ZetaFunding for {data[2]}</Text>
            <Box />
          </Flex>

          <Box
            color="black"
            py={3}
            mx={8}
            px={8}
            borderRadius={"15px"}
            h={170}
            bgColor="white"
            gap={6}
            transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "xl",
            }}
            cursor="pointer"
          >
            <Flex color="#5E5E5E" fontWeight={600} justify="space-between">
              {/* description */}
              <Text>{data[5]}</Text>
              <Text>
                {Math.floor(Number(data[6]) / 10 ** 18 / Number(data[3])) * 100}
                %
              </Text>
            </Flex>
            <Flex color="#353535" mt={1}>
              {zetaVal} ZETA
            </Flex>

            <Flex
              color="#1935C4"
              fontWeight={600}
              mt={3}
              justify="space-between"
            >
              <Text>${Number(data[6]) / 10 ** 18}</Text>
              <Text>${Number(data[3])}</Text>
            </Flex>
            <Progress
              color="#1935C4"
              value={Math.floor(
                (Number(data[6]) / 10 ** 18 / Number(data[3])) * 100
              )}
            />
          </Box>

          <Box mx={8}>
            <NumberInput
              defaultValue={0}
              min={0}
              max={Number(data[3]) - Number(data[6]) / 10 ** 18}
              onChange={(valueString) => handleSendVal(valueString)}
              value={format(value)}
            >
              <NumberInputField my={3} placeholder="how much in dollars?" />
            </NumberInput>
            <Button
              onClick={handleDonate}
              w={"full"}
              my={3}
              color="white"
              bgColor="purple"
              isDisabled={eqSendingZeta <= 0}
            >
              Send {eqSendingZeta} Zeta to {data[2]}
            </Button>
          </Box>
        </Box>
      )}
    </SideNav>
  );
}

export default Details;

export function Transactions() {
  const transaction = useAppSelector((state) => state.transction);

  return (
    <TableContainer
      mx={8}
      h={"200px"}
      overflowY={"scroll"}
      css={{
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for Chrome, Safari, and Opera
        },
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
      }}
    >
      <Table variant="simple">
        <TableCaption>Transaction details</TableCaption>
        <Thead>
          <Tr>
            <Th>Signature</Th>
            <Th>Date</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transaction?.map((val: TransactionT) => (
            <Tr key={val.transactionNo}>
              <Td>{val.signature.slice(0, 30)}...</Td>
              <Td>{val.time.toISOString()}</Td>
              <Td>{val.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    //nothingS
  );
}
