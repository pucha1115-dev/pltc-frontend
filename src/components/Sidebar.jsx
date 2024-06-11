import React, { useState } from 'react'
import { Avatar, Flex, Text, Divider, Heading, IconButton } from '@chakra-ui/react'
import { COLORS } from '../constants'
import {FiCalendar, FiDollarSign, FiHome, FiMenu, FiSettings, FiUser} from 'react-icons/fi'
import { FaPaw } from "react-icons/fa6";
import NavItem from './NavItem'

const Sidebar = () => {
  const [navSize, setNavSize] = useState("large")
  return (
    <Flex
    pos="sticky"
    h='100vh'
    bg={COLORS.FOREGROUND}
    w={navSize === 'small'? '75px': '200px'}
    flexDir='column'
    justifyContent='space-between'
    >
      <Flex 
      flexDir='column'
      alignItems={navSize === 'small'? 'center': 'flex-start'}
      as='nav'
      >
       
        <IconButton
          mt={3}
          background='none'
          color={COLORS.TEXT}
          _hover={{background: 'none'}}
          icon={<FiMenu/>}
          onClick={()=>{
            if(navSize === 'large'){
              setNavSize('small')
            }
            else{
              setNavSize('large')
            }
          }}
        />

<Flex
        p='10%'
        flexDir='column'
        w='100%'
        alignItems={navSize === 'small'? 'center': 'flex-start'}
        mb={4}
      >
       
        <Flex flexDir='column' mt={4} align='center' w='100%'>
          <Avatar size={navSize === 'small'? 'sm': '180px'} src='../assets/images/profile.png'/>
            <Flex display={navSize === 'small'? 'none': 'flex'} flexDir='column' ml={4}>
              <Heading mt={10} as='h3' size='sm'>John Paul Geralla</Heading>
             
            </Flex>
        </Flex>
        <Divider mt={10} display={navSize === 'small'? 'none': 'flex'}/>

      </Flex>

        <NavItem navSize={navSize} title='Dashboard' icon={FiHome} active={true}/>
        <NavItem navSize={navSize} title='Calendar' icon={FiCalendar} active={false}/>
        <NavItem navSize={navSize} title='Clients' icon={FiUser} active={false}/>
        <NavItem navSize={navSize} title='Animals' icon={FaPaw} active={false}/>
        <NavItem navSize={navSize} title='Stocks' icon={FiDollarSign} active={false}/>
        <NavItem navSize={navSize} title='Settings' icon={FiSettings} active={false}/>
      </Flex>
    </Flex>
  )
}

export default Sidebar;