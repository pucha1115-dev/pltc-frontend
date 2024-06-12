import React, { useState } from 'react'
import { Avatar, Flex, Text, Divider, Heading, IconButton } from '@chakra-ui/react'
import { COLORS } from '../../constants'
import {FiHome, FiMenu, FiUser} from 'react-icons/fi'
import { FaSimCard } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { BsModem } from "react-icons/bs";

import NavItem from './NavItem'

const Sidebar = () => {
  const [navSize, setNavSize] = useState("large")
  return (
    <Flex
    pos="fixed"
    overflow='hidden'
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
          <Avatar size={navSize === 'small'? 'md': '180px'} src='../assets/images/profile.png'/>
        
              <Heading display={navSize === 'small'? 'none': 'flex'} mt={10} as='h3' size='sm'>John Paul Geralla</Heading>
            
          
        </Flex>
        <Divider mt={10} display={navSize === 'small'? 'none': 'flex'}/>

      </Flex>

        <NavItem navSize={navSize} title='Dashboard' icon={FiHome} linkTo='/' active={false}/>
        <NavItem navSize={navSize} title='Agent Master' icon={FiUser} linkTo='/agent_master_list' active={false}/>
        <NavItem navSize={navSize} title='SIM Master' icon={FaSimCard} linkTo='/sim_master_list' active={false}/>
        <NavItem navSize={navSize} title='Modem Master' icon={BsModem} active={false}/>
        <NavItem navSize={navSize} title='ROF' icon={IoDocumentText} linkTo='/rof' active={false} />
      </Flex>
    </Flex>
  )
}

export default Sidebar;