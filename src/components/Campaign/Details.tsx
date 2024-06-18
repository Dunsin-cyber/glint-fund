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

function Details() {
  const { id }: any = useParams();
  const { getACampaign, donate, transactionPending } =
    React.useContext(AppContext);

  const recipient = useAppSelector((state) => state.recipient);
  console.log(recipient);

  const navigate = useNavigate();

  const [amount, setAmount] = React.useState<number>(0);
  // React.useMemo(() => {
  //   const call = async () => {
  //     if (id) {
  //       await getACampaign(id);
  //     }
  //   };
  //   call();
  // }, [publicKey, id]);

  const amountLeft = recipient.amountRequired - recipient.amountDonated;
  const progress = (recipient.amountDonated / recipient.amountRequired) * 100;

  const parse: any = (val: string) => val.replace(/^\$/, "");
  const format = (val: number) => `$` + val;

  const handleDonate = async () => {
    await donate(amount);
  };

  return <Box>details page</Box>;
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
