'use client';
import {
  Card,
  CardHeader,
  CardBody,

} from '@material-tailwind/react';
import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect } from 'react';



export default function Dashboard() {


const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  useEffect(() => {
    const querystring = window.location.search;
    const urlParam = new URLSearchParams(querystring);
    const TokenParam = urlParam.get('token');
    if(TokenParam===null){
      window.location.assign('localhost:3000/auth/sign-in')
    }
    else localStorage.setItem('token',TokenParam);
  }, []);

  return (
    <>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        
      </Box>
    </>
  );
}
