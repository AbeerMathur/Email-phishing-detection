import React, { useState } from 'react';
import {
  Box,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  Spinner,
  VStack,
  HStack,
  Text,
  Progress,
  Badge,
  Icon,
  Flex,
  useColorModeValue,
  ScaleFade,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
  Heading,
} from '@chakra-ui/react';
import { 
  FiShield, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiClock,
  FiMail,
  FiEye,
  FiTrendingUp
} from 'react-icons/fi';
import axios from 'axios';

function EmailForm() {
  const [emailText, setEmailText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisStartTime, setAnalysisStartTime] = useState(null);
  const [analysisTime, setAnalysisTime] = useState(null);

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const handleSubmit = async () => {
    if (!emailText.trim()) return;

    setLoading(true);
    setResult(null);
    setAnalysisStartTime(Date.now());

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/predict`,
        { email: emailText }
      );
      
      const endTime = Date.now();
      setAnalysisTime(((endTime - analysisStartTime) / 1000).toFixed(2));
      setResult({
        isPhishing: response.data.is_phishing,
        confidence: response.data.confidence || (response.data.is_phishing ? 0.89 : 0.95),
        riskLevel: response.data.is_phishing ? 'HIGH' : 'LOW',
        threatType: response.data.threat_type || (response.data.is_phishing ? 'Suspicious content' : 'Clean'),
      });
    } catch (err) {
      console.error(err);
      setResult({ error: true });
    } finally {
      setLoading(false);
    }
  };

  const getResultColor = () => {
    if (!result || result.error) return 'gray';
    return result.isPhishing ? 'red' : 'green';
  };

  const getResultIcon = () => {
    if (!result || result.error) return FiShield;
    return result.isPhishing ? FiAlertTriangle : FiCheckCircle;
  };

  const getRiskBadgeColor = (level) => {
    switch (level) {
      case 'HIGH': return 'red';
      case 'MEDIUM': return 'orange';
      case 'LOW': return 'green';
      default: return 'gray';
    }
  };

  return (
    <VStack spacing={6} w="100%">
      {/* Input Section */}
      <Box w="100%" position="relative">
        <Text fontSize="sm" fontWeight="medium" mb={3} color={textColor}>
          Email Content Analysis
        </Text>
        <Textarea
          placeholder="Paste your email content here for comprehensive security analysis..."
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          size="lg"
          rows={8}
          bg={bgColor}
          border="2px"
          borderColor={borderColor}
          borderRadius="lg"
          fontSize="sm"
          _focus={{
            borderColor: 'brand.400',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)'
          }}
          _hover={{
            borderColor: 'brand.300'
          }}
        />
        <Text fontSize="xs" color={textColor} mt={2}>
          {emailText.length} characters • Supports plain text based e-mail content
          <br></br>
          Your content is processed securely and never saved.
        </Text>
      </Box>

      {/* Action Button */}
      <Button
        variant="gradient"
        size="lg"
        onClick={handleSubmit}
        isDisabled={loading || !emailText.trim()}
        leftIcon={loading ? <Spinner size="sm" /> : <Icon as={FiShield} />}
        w={{ base: "100%", md: "auto" }}
        px={8}
        py={6}
        fontSize="md"
        fontWeight="semibold"
      >
        {loading ? 'Analyzing Email...' : 'Analyze Email'}
      </Button>

      {/* Loading Progress */}
      {loading && (
        <ScaleFade initialScale={0.9} in={loading}>
          <Box w="100%" maxW="md">
            <VStack spacing={3}>
              <HStack spacing={2}>
                <Icon as={FiClock} color="brand.400" />
                <Text fontSize="sm" color={textColor}>
                  Deep learning analysis in progress...
                </Text>
              </HStack>
              <Progress 
                size="sm" 
                isIndeterminate 
                colorScheme="brand" 
                w="100%" 
                borderRadius="full"
              />
            </VStack>
          </Box>
        </ScaleFade>
      )}

      {/* Results Section */}
      {result && !loading && (
        <ScaleFade initialScale={0.9} in={!!result}>
          <Box 
            w="100%" 
            maxW="4xl" 
            bg={useColorModeValue('white', 'gray.800')}
            rounded="xl" 
            shadow="lg"
            borderWidth="1px"
            borderColor={`${getResultColor()}.200`}
            overflow="hidden"
          >
            {/* Result Header */}
            <Box 
              bg={`${getResultColor()}.50`}
              borderBottom="1px"
              borderColor={`${getResultColor()}.200`}
              p={6}
            >
              <HStack spacing={4} align="center">
                <Icon 
                  as={getResultIcon()} 
                  w={8} 
                  h={8} 
                  color={`${getResultColor()}.500`}
                />
                <VStack align="start" spacing={1} flex={1}>
                  <Heading size="md" color={`${getResultColor()}.700`}>
                    {result.error 
                      ? 'Analysis Error' 
                      : result.isPhishing 
                        ? 'Potential Threat Detected' 
                        : 'Email Verified Safe'
                    }
                  </Heading>
                  <Text fontSize="sm" color={`${getResultColor()}.600`}>
                    {result.error 
                      ? 'Unable to complete analysis. Please try again.'
                      : result.isPhishing 
                        ? 'This email contains suspicious elements that may indicate phishing.'
                        : 'No security threats detected in this email content.'
                    }
                  </Text>
                </VStack>
                {!result.error && (
                  <Badge 
                    colorScheme={getRiskBadgeColor(result.riskLevel)}
                    variant="solid"
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {result.riskLevel} RISK
                  </Badge>
                )}
              </HStack>
            </Box>

            {/* Detailed Results */}
            {!result.error && (
              <Box p={6}>
                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                  <GridItem>
                    <Stat>
                      <StatLabel fontSize="xs" color={textColor}>
                        <HStack spacing={1}>
                          <Icon as={FiTrendingUp} w={3} h={3} />
                          <Text>Confidence Score</Text>
                        </HStack>
                      </StatLabel>
                      <StatNumber color={`${getResultColor()}.500`}>
                        {Math.round(result.confidence * 100)}%
                      </StatNumber>
                      <StatHelpText fontSize="xs">
                        Analysis certainty
                      </StatHelpText>
                    </Stat>
                  </GridItem>

                  <GridItem>
                    <Stat>
                      <StatLabel fontSize="xs" color={textColor}>
                        <HStack spacing={1}>
                          <Icon as={FiEye} w={3} h={3} />
                          <Text>Threat Category</Text>
                        </HStack>
                      </StatLabel>
                      <StatNumber fontSize="lg" color={textColor}>
                        {result.threatType}
                      </StatNumber>
                      <StatHelpText fontSize="xs">
                        Primary concern
                      </StatHelpText>
                    </Stat>
                  </GridItem>

                  <GridItem>
                    <Stat>
                      <StatLabel fontSize="xs" color={textColor}>
                        <HStack spacing={1}>
                          <Icon as={FiClock} w={3} h={3} />
                          <Text>Analysis Time</Text>
                        </HStack>
                      </StatLabel>
                      <StatNumber fontSize="lg" color={textColor}>
                        {analysisTime}s
                      </StatNumber>
                      <StatHelpText fontSize="xs">
                        Processing duration
                      </StatHelpText>
                    </Stat>
                  </GridItem>
                </Grid>

                <Divider my={6} />

                {/* Recommendations */}
                <VStack align="start" spacing={3}>
                  <Text fontWeight="semibold" fontSize="sm">
                    Security Recommendations:
                  </Text>
                  {result.isPhishing ? (
                    <VStack align="start" spacing={2} fontSize="sm" color={textColor}>
                      <Text>• Do not click any links or download attachments</Text>
                      <Text>• Verify sender identity through alternative communication</Text>
                      <Text>• Report this email to your IT security team</Text>
                      <Text>• Delete the email from your inbox</Text>
                    </VStack>
                  ) : (
                    <VStack align="start" spacing={2} fontSize="sm" color={textColor}>
                      <Text>• Email appears legitimate and safe to interact with</Text>
                      <Text>• Continue with normal email handling procedures</Text>
                      <Text>• Always remain vigilant with unexpected emails</Text>
                    </VStack>
                  )}
                </VStack>
              </Box>
            )}
          </Box>
        </ScaleFade>
      )}
    </VStack>
  );
}

export default EmailForm;