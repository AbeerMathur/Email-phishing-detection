import React from 'react';
import { 
  Box, 
  Heading, 
  Container, 
  Text, 
  Flex, 
  Icon, 
  Badge,
  useColorModeValue,
  VStack,
  HStack,
  Link
} from '@chakra-ui/react';
import { FiShield, FiMail, FiZap } from 'react-icons/fi';
import EmailForm from './components/EmailForm';

function App() {
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, pink.50)',
    'linear(to-br, gray.900, blue.900, purple.900)'
  );
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      {/* Header */}
      <Box as="header" py={6} borderBottom="1px" borderColor="rgba(255,255,255,0.1)">
        <Container maxW="container.xl">
          <Flex align="center" justify="space-between">
            <HStack spacing={3}>
              <Icon as={FiShield} w={8} h={8} color="brand.400" />
              <Heading size="lg" fontWeight="bold">
                PhisherMan
              </Heading>
              <Badge colorScheme="green" variant="subtle" fontSize="xs">
                Catching Phish Before They Hook You.
              </Badge>
            </HStack>
            <HStack spacing={6}>
              <Text fontSize="sm" color={textColor}>
                <b><Link href='https://ieeexplore.ieee.org/document/10830374'>🔗 Supported by IEEE-published study</Link></b>
              </Text>
              <Badge colorScheme="brand" variant="outline">
                98.7% Accuracy
              </Badge>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.lg" py={12}>
        <VStack spacing={8} textAlign="center">
          {/* Hero Section */}
          <VStack spacing={4} maxW="2xl">
            <Heading 
              size="2xl" 
              bgGradient="linear(to-r, brand.400, purple.400, pink.400)"
              bgClip="text"
              fontWeight="extrabold"
              lineHeight="shorter"
            >
              Email Phishing Detection
            </Heading>
            <Text fontSize="xl" color={textColor} maxW="lg">
              Instantly Detect Phishing Emails with Proven Machine Learning mechanism. Backed by IEEE-Published Research.
            </Text>
          </VStack>

          {/* Stats Cards */}
          <HStack spacing={8} wrap="wrap" justify="center">
            <VStack 
              p={6} 
              bg={cardBg} 
              rounded="xl" 
              shadow="lg" 
              borderWidth="1px"
              borderColor="rgba(255,255,255,0.1)"
              minW="200px"
            >
              <Icon as={FiMail} w={8} h={8} color="brand.400" />
              <Text fontSize="2xl" fontWeight="bold">18K+</Text>
              <Text fontSize="sm" color={textColor}>Emails Powering Our AI</Text>
            </VStack>
            
            <VStack 
              p={6} 
              bg={cardBg} 
              rounded="xl" 
              shadow="lg" 
              borderWidth="1px"
              borderColor="rgba(255,255,255,0.1)"
              minW="200px"
            >
              <Icon as={FiZap} w={8} h={8} color="purple.400" />
              <Text fontSize="2xl" fontWeight="bold">&lt;0.5s</Text>
              <Text fontSize="sm" color={textColor}>Analysis Time</Text>
            </VStack>
            
            <VStack 
              p={6} 
              bg={cardBg} 
              rounded="xl" 
              shadow="lg" 
              borderWidth="1px"
              borderColor="rgba(255,255,255,0.1)"
              minW="200px"
            >
              <Icon as={FiShield} w={8} h={8} color="green.400" />
              <Text fontSize="2xl" fontWeight="bold">98.7%</Text>
              <Text fontSize="sm" color={textColor}>Detection Rate</Text>
            </VStack>
          </HStack>

          {/* Main Form */}
          <Box 
            w="100%" 
            maxW="4xl" 
            bg={cardBg}
            rounded="2xl" 
            shadow="2xl"
            borderWidth="1px"
            borderColor="rgba(255,255,255,0.1)"
            overflow="hidden"
          >
            <Box 
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              p={6}
              textAlign="center"
            >
              <Heading size="lg" color="white" mb={2}>
                Detect Phishing Threats in Seconds
              </Heading>
              <Text color="whiteAlpha.900" fontSize="sm">
                Paste any suspicious email content below, AI will analyze it instantly and flag risks.
              </Text>
            </Box>
            
            <Box p={8}>
              <EmailForm />
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default App;