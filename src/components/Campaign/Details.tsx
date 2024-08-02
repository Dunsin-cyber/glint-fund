import React, { useEffect } from "react";
import {
  Box,
  Container,
  Center,
  Text,
  Heading,
  Progress,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
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
import { AppContext } from "../../Context";
import Navbar from "../Navbar";
import { useAppSelector } from "../../redux/hook";
import { TransactionT } from "../../redux/types";
import { ChatIcon } from "@chakra-ui/icons";
import { IoIosArrowBack } from "react-icons/io";
import SideNav from "../SideNav/HalfSide";
import { useGetACampaign } from "../../hooks";

function Details() {
  const { id }: any = useParams();
  const { data, isLoading } = useGetACampaign(id);
  console.log(data);
  const navigate = useNavigate();

  return (
    <SideNav>
      {data && (
        <>
          <Flex my={6} mx={6} justify="space-between">
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
                {Math.floor((Number(data[6]) / Number(data[3])) * 100)}%
              </Text>
            </Flex>
            <Flex color="#353535" mt={1}>
              0.334 ZETA
            </Flex>

            <Flex
              color="#1935C4"
              fontWeight={600}
              mt={3}
              justify="space-between"
            >
              <Text>${Number(data[6])}</Text>
              <Text>${Number(data[3])}</Text>
            </Flex>
            <Progress
              color="#1935C4"
              value={Math.floor((Number(data[6]) / Number(data[3])) * 100)}
            />
          </Box>

          <Button my={3}>Send Zeta to {data[2]}</Button>
        </>
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
