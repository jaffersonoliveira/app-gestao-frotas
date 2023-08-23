import axios from "axios";
import { ScrollView } from "native-base";
import { Box, Heading, Text, VStack } from "native-base";
import { useEffect, useState } from "react";

function Card(props: {title: string, text: string}){
  return (
    <VStack px='5%' py='3%' space='xs'>
      <Text color='white' fontSize='20' alignSelf='center'>{props.title}</Text>
      <Text color='light.300' fontSize='45' alignSelf='center'>{props.text}</Text>
    </VStack>
  );
}

function translateTitle(title: string): string {
  let translatedTitle = ''
  switch (title) {
    case 'suppliesQtde':
      translatedTitle = 'Quantidade de Abastecimentos'
      break;
    case 'suppliesValue':
      translatedTitle = 'Valor Total de Abastecimentos'
      break;
    case 'vehicles':
      translatedTitle = 'Quantidade de Veículos'
      break;
    case 'tanksQtde':
      translatedTitle = 'Quantidade de Tanques'
      break;
    case 'tanksValue':
      translatedTitle = 'Saldo em Tanques'
      break;
  }
  return translatedTitle
}

export default function Dashboard() {
  const [statistics, setStatistics] = useState<{supplies: any[], vehicles: any[], tanks: any[]}>();

  async function getStatistics() {
    const res = await axios.get<{ success: boolean; message: string; data: {supplies: any[], vehicles: any[], tanks: any[]} }>("http://ec2-3-21-166-11.us-east-2.compute.amazonaws.com:4000/statistics");
    console.log(res.data)
    setStatistics(res.data.data);
  }

  useEffect(() => {getStatistics()},[])

  return (
    <ScrollView h="full" _dark={{ bg: "gray.700" }} _light={{ bg: "#2D3748" }}>
      <VStack height="full" _dark={{ bg: "gray.700" }} _light={{ bg: "#2D3748" }} p="4%" space="md">
        <Heading color="gray.50">Dashboard</Heading>
        <Text color="gray.50">Algumas métrica importantes</Text>
        {
          statistics && Object.entries(statistics??{}).map((data)=>{
            const title = translateTitle(data[0])
            const text = data[1][0].total
            return <Box justifyContent='center' w="100%" h='40' borderRadius={10} borderColor="" shadow={"4"} bgColor="#384459"><Card key={1} text={text} title={title}/></Box>
          })
        }
      </VStack>
    </ScrollView>
  );
}
