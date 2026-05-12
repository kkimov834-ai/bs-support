import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Icon,
  Badge,
  Divider,
  Flex,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { MdAnalytics, MdPowerSettingsNew, MdTrendingUp } from "react-icons/md";
import Modules from "../components/Modules";

// Məlumat qutuları üçün ortaq komponent
const DataBox = ({ label, value, color = "#718096" }) => (
  <Box
    border="1px solid"
    borderColor="#2D3748"
    borderRadius="lg"
    p={3}
    bg="rgba(255, 255, 255, 0.02)"
    minW="150px"
    flex="1"
  >
    <Text fontSize="xs" color="gray.500" mb={1} textTransform="uppercase">
      {label}
    </Text>
    <Text color={color} fontSize="sm" fontWeight="bold">
      {value}
    </Text>
  </Box>
);

function Home({
  customerData: initialData,
  selectedUser,
  customerLoading,
  userHistory,
}) {
  const [data, setData] = useState(initialData);
  const [companyModules, setCompanyModules] = useState({});
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Kənardan gələn müştəri dəyişəndə state-i yenilə
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Sessiyanı tamamilə təmizləyən funksiya
  const handleEndSession = () => {
    setData(null);
    setCompanyModules({}); // Bütün Modules cədvəllərini silir

    toast({
      title: "Sessiya sonlandırıldı.",
      status: "warning",
      duration: 1000,
      isClosable: true,
      position: "top-right",
    });
  };

  const cardStyle = {
    w: "100%",
    bg: "#1A222B",
    p: 6,
    borderRadius: "16px",
    border: "1px solid",
    borderColor: "#2D3748",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
  };

  return (
    <VStack spacing={6} w="90%" p={6} align="stretch" bg="#0F172A" minH="100vh">
      {/* 1. MÜŞTƏRİ MƏLUMATLARI KARTI */}
      <Box
        {...cardStyle}
        borderLeft="4px solid"
        borderLeftColor={data ? "#4FD1C5" : "red.500"}
      >
        <HStack spacing={6} align="start" w="100%">
          <Icon
            as={MdAnalytics}
            w={12}
            h={12}
            p={2.5}
            borderRadius="xl"
            bg="#111827"
            color="#4FD1C5"
          />

          <VStack align="start" spacing={3} w="100%">
            <HStack justifyContent="space-between" w="100%">
              <Heading size="md" color="white">
                Müştəri Paneli
              </Heading>
              {data && (
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    margin={2}
                    colorScheme="cyan"
                    variant="outline"
                    onClick={handleEndSession}
                  >
                    Sessiyanı Bitir
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="cyan"
                    variant="outline"
                    onClick={onOpen}
                  >
                    Tarixçə
                  </Button>
                </HStack>
              )}
              <Button size="sm" colorScheme="cyan" variant="outline">
                Kredit Ver
              </Button>
              <Button size="sm" colorScheme="cyan" variant="outline">
                Bonus Ver
              </Button>
              <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                <ModalOverlay backdropFilter="blur(5px)" />
                <ModalContent bg="#1A222B" color="white" borderRadius="xl">
                  <ModalHeader borderBottom="1px solid" borderColor="#2D3748">
                    Əməliyyat Tarixçəsi
                  </ModalHeader>
                  <ModalCloseButton />

                  <ModalBody p={6}>
                    <TableContainer overflowY="auto" maxH="500px">
                      <Table
                        variant="simple"
                        size="sm"
                        layout="fixed"
                        width="100%"
                      >
                        <Thead>
                          <Tr
                            borderBottom="2px solid"
                            borderColor="whiteAlpha.200"
                          >
                            <Th
                              width="15%"
                              color="gray.500"
                              fontSize="10px"
                              py={4}
                            >
                              QİYMƏT
                            </Th>
                            <Th
                              width="35%"
                              color="gray.500"
                              fontSize="10px"
                              py={4}
                            >
                              MƏLUMAT
                            </Th>
                            <Th
                              width="20%"
                              color="gray.500"
                              fontSize="10px"
                              py={4}
                            >
                              TARİX
                            </Th>
                            <Th
                              width="15%"
                              color="gray.500"
                              fontSize="10px"
                              py={4}
                            >
                              ÜSUL
                            </Th>
                            <Th
                              width="15%"
                              color="gray.500"
                              fontSize="10px"
                              py={4}
                              textAlign="right"
                            >
                              ID
                            </Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {userHistory.map((item, index) => (
                            <Tr
                              key={item.transaction_id || index}
                              _hover={{ bg: "whiteAlpha.50" }}
                              transition="all 0.2s"
                              borderBottom="1px solid"
                              borderColor="whiteAlpha.100"
                            >
                              {/* Qiymət */}
                              <Td py={4}>
                                <Text
                                  fontWeight="700"
                                  fontSize="md"
                                  color="green.300"
                                >
                                  {item.amount} ₼
                                </Text>
                              </Td>

                              {/* Məlumat */}
                              <Td py={4}>
                                <Text
                                  fontSize="sm"
                                  color="gray.200"
                                  isTruncated
                                  title={item.info}
                                >
                                  {item.info}
                                </Text>
                              </Td>

                              {/* Tarix */}
                              <Td py={4}>
                                <Text
                                  fontSize="xs"
                                  color="gray.400"
                                  fontFamily="mono"
                                >
                                  {item.moment}
                                </Text>
                              </Td>

                              {/* Ödəniş Üsulu */}
                              <Td py={4}>
                                <Badge
                                  px={2}
                                  py={0.5}
                                  rounded="full"
                                  variant="subtle"
                                  fontSize="9px"
                                  colorScheme={
                                    item.payment_source === "transfer"
                                      ? "blue"
                                      : "orange"
                                  }
                                >
                                  {item.payment_source}
                                </Badge>
                              </Td>

                              {/* ID */}
                              <Td py={4} textAlign="right">
                                <Text
                                  fontSize="10px"
                                  color="gray.600"
                                  fontFamily="mono"
                                  _hover={{ color: "gray.400" }}
                                  cursor="default"
                                >
                                  #{item.transaction_id}
                                </Text>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </ModalBody>

                  <ModalFooter borderTop="1px solid" borderColor="#2D3748">
                    <Button
                      colorScheme="cyan"
                      variant="ghost"
                      onClick={onClose}
                    >
                      Bağla
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </HStack>

            <Divider borderColor="#2D3748" />

            {customerLoading ? (
              <Text>Loading...</Text>
            ) : data ? (
              <Flex wrap="wrap" gap={4} w="100%">
                <DataBox
                  label="Account"
                  value={`${data?.data?.account}`}
                  color="white"
                />
                <DataBox
                  label="E-poçt"
                  color="white"
                  value={`${data?.data?.email}`}
                />
                <DataBox
                  label="Soyad"
                  value={`${data?.data?.lastname}`}
                  color="white"
                />
                <DataBox
                  label="İstifadəçi adı"
                  value={`${data?.data?.name}`}
                  color="white"
                />
                <DataBox
                  label="Partnerpin"
                  value={`${data?.data?.partnerpin}`}
                  color="white"
                />
                <DataBox label="Telefon" value={data?.data?.phone} />
                <DataBox
                  label="Qeydiyyat Tarixi"
                  value={data?.data?.registermoment}
                />

                <DataBox
                  label="Balans"
                  value={`${data?.data?.balance}`}
                  color="#2ECC71"
                />
              </Flex>
            ) : (
              <Text color="gray.500" fontStyle="italic">
                Aktiv müştəri tapılmadı.
              </Text>
            )}
          </VStack>
        </HStack>
      </Box>

      {/* 2. ŞİRKƏT MODULLARI (Dinamik Cədvəllər) */}
      <Modules
        companyModules={companyModules}
        setCompanyModules={setCompanyModules}
      />

      {/* 3. MONİTORİNG MODULU */}
      <Box
        {...cardStyle}
        borderTop="2px solid"
        borderTopColor={data ? "#4FD1C5" : "gray.600"}
      >
        <HStack spacing={6} align="start">
          <Icon
            as={MdTrendingUp}
            w={12}
            h={12}
            p={2.5}
            borderRadius="xl"
            bg="#111827"
            color="#4FD1C5"
          />
          <VStack align="start" spacing={3} w="100%">
            <Heading as="h4" size="sm" color="#FFFFFF" letterSpacing="widest">
              SİSTEM MONİTORİNQİ
            </Heading>
            <Divider borderColor="gray.700" />
            <Text fontSize="md" color="#718096">
              {data
                ? `${data.name} ${data.lastname} üçün real-vaxt metrikləri və modul keçidləri izlənilir.`
                : "Sessiya bağlıdır. Sistem metrikləri gözləmə rejimindədir."}
            </Text>
            {data && (
              <Badge colorScheme="green" variant="subtle" fontSize="10px">
                Live Connection: Stable
              </Badge>
            )}
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
}

export default React.memo(Home);
