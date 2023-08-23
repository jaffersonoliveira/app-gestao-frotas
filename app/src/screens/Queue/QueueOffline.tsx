import React, { useEffect, useState } from 'react';
import { Text, Box, VStack, Heading } from 'native-base';
import { useOfflineQueue } from "../../hooks";
import { ScrollView } from 'native-base';

const QueueOfflie = () => {
  const queue = useOfflineQueue();
  const [dataArray, setDataArray] = useState<any[]>()

  useEffect(()=>{
    setDataArray(queue.getQueue())
  },[])

  return (
    <ScrollView h="full" _dark={{ bg: "gray.700" }} _light={{ bg: "#2D3748" }}>
    <VStack p="5%" space="md">
        <Heading color="gray.50">Pendencias de sincronização</Heading>
          {dataArray && dataArray.map((item, index) => (
              <Box w="100%" h="70" borderRadius="8" bgColor="#384459" shadow={"5"} justifyContent="center" p="3">
                <Text color="white">Ação: {item.action}</Text>
                <Text color="white">Função: {item.function}</Text>
                {item.value.map((valueItem, valueIndex) => (
                  <Text color="white" key={valueIndex}>
                    Total de Abastecimento: {valueItem.total_abastecimento}, Data: {valueItem.data.substring(0,10)}
                  </Text>
                ))}
              </Box>
          ))}
      </VStack>
      </ScrollView>
  );
};

export default QueueOfflie;