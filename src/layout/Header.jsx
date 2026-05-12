import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  List,
  ListItem,
  Text,
  Container,
  Image,
  HStack,
} from "@chakra-ui/react";
import { AtSignIcon, SearchIcon } from "@chakra-ui/icons";
import { getUserAccounts } from "../api/userAccountService";
import { getUserInfo } from "../api/userInfoService";
import { userProfiles } from "../api/userProfilesService";
import { getUserHistory } from "../api/userHistoryService";
import { getUserModules } from "../api/userModulesService";

function Header({ onSelectCustomer }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);

  const handleSelectUser = async (account) => {
    console.log("Seçilən Hesab:", account);

    try {
      // Hər iki sorğunu eyni anda başladırıq
      const [data, profileUsers, userHistory, userModules] = await Promise.all([
        getUserInfo(account),
        userProfiles(account),
        getUserHistory(account),
        getUserModules(account),
      ]);

      if (data) {
        console.log("İstifadəçi Məlumatı:", data);
      }

      if (profileUsers) {
        console.log("Profil İstifadəçiləri:", profileUsers);
      }

      if (userHistory) {
        console.log("İstifadəçi Tarixçəsi:", userHistory);
      }

      if (userModules) {
        console.log("İstifadəçi Tarixçəsi:", userHistory);
      }

      // Burada state update və ya digər məntiqləri icra edə bilərsən
      // Örnək: setUserData(data);
    } catch (error) {
      // Sorğulardan biri uğursuz olarsa bura düşəcək
      console.error("Məlumat gətirilərkən xəta baş verdi:", error);
      // İstifadəçiyə xəta mesajı göstərmək üçün Toast və ya Alert istifadə edə bilərsən
    }
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchValue(term);

    // 1. Şərt: Əgər 4 simvoldan azdırsa, köhnə nəticələri sil və sorğu atma
    if (term.length < 4) {
      setResults([]);
      return;
    }

    clearTimeout(window.searchTimeout);

    window.searchTimeout = setTimeout(async () => {
      try {
        const response = await getUserAccounts(term);

        if (response && response.status === "success") {
          setResults(response.data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Axtarış xətası:", error);
        setResults([]);
      }
    }, 300);
  };

  return (
    <Box
      bg="#121A21"
      py={4}
      color="#E2E8F0"
      position="relative"
      zIndex={1000}
      borderBottom="1px solid rgba(79, 209, 197, 0.1)"
    >
      <Container maxW="full" px={8}>
        <Flex justify="space-between" align="center">
          <HStack spacing={4}>
            <Image
              src="/logo.ico"
              alt="Logo"
              boxSize="40px"
              borderRadius="full"
              objectFit="contain"
            />
            <Heading as="h1" size="lg" letterSpacing="tight">
              Bein Systems
            </Heading>
          </HStack>
          <Box position="relative" w="400px">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AtSignIcon color="cyan.400" />
              </InputLeftElement>

              <Input
                placeholder="Yalnız ACCOUNT  yazın (Məs: baku_01)..."
                fontFamily="'Courier New', Courier, monospace"
                fontWeight="bold"
                letterSpacing="1px"
                bg="rgba(255, 255, 255, 0.05)"
                border="2px solid"
                borderColor="#2D3748"
                color="white"
                _hover={{ borderColor: "#4FD1C5" }}
                _focus={{
                  borderColor: "#4FD1C5",
                  boxShadow: "0 0 8px rgba(79, 209, 197, 0.3)",
                  bg: "rgba(255, 255, 255, 0.08)",
                }}
                value={searchValue}
                onChange={handleSearch}
              />
            </InputGroup>

            {results.length > 0 && (
              <List
                position="absolute"
                top="110%"
                w="100%"
                bg="#1A222B"
                border="1px solid #2D3748"
                boxShadow="0 10px 25px rgba(0,0,0,0.5)"
                borderRadius="md"
                color="white"
                maxH="300px"
                overflowY="auto"
                zIndex="1001"
              >
                {results.map((data) => (
                  <ListItem
                    key={data}
                    p={3}
                    borderBottom="1px solid rgba(255,255,255,0.05)"
                    _hover={{
                      bg: "rgba(79, 209, 197, 0.1)",
                      cursor: "pointer",
                      color: "#4FD1C5",
                    }}
                    onClick={() => {
                      onSelectCustomer(data);
                      setResults([]);
                      setSearchValue("");
                    }}
                  >
                    <Text fontSize="xs" color="gray.400">
                      {data.account}
                    </Text>
                    <Text fontWeight="bold" fontSize="sm">
                      {data.name} {data.lastname}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {data.email}
                    </Text>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          <Box w="100px" /> {/* Balans üçün boşluq */}
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
