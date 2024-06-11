import { Flex, Link, Menu, MenuButton, Icon, Text } from "@chakra-ui/react"
import {COLORS} from '../constants'



const NavItem = ({navSize, icon, title, active}) => {
  return (
    <Flex
      flexDir='column'
      w='100%'
      alignItems={navSize === 'small'? 'center':'flex-start'}
    >
      <Menu placement="bottom">
        <Link
          backgroundColor={active && COLORS.BACKGROUND}
          p={3}
          _hover={{textDecor: 'none', backgroundColor: COLORS.BACKGROUND, color: 'black'}}
          w={navSize === 'large' && '100%'}
          borderRadius={navSize === 'small'? '8px': '0px'}
        >
          <MenuButton w="100%">
            <Flex alignItems='center'>
              <Icon as={icon} fontSize='xl' color={active ? "white": COLORS.TEXT} />
              <Text display={navSize === 'small'? 'none': 'flex'} ml={3} color={active ? "white": COLORS.TEXT} >{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  )
}

export default NavItem