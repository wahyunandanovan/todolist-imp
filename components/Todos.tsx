import React from 'react'
import { Box, SimpleGrid, Text, ButtonGroup, IconButton } from '@chakra-ui/react'
import { CheckCircleIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { PostsInterface } from '@/interfaces/PostsInterface'


function Todos({ data }: any) {
   return (
      <Box my={8}>
         {data?.map((item: PostsInterface, idx: number) => {
            return (
               <SimpleGrid key={idx} columns={[1, 2, 2]} spacing='16px' sx={{ border: '1px solid #e9ecef', borderRadius: 6, p: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box display='flex' alignItems='center'>
                     <CheckCircleIcon w={6} h={6} color="green" />
                     <Box ml={4}>
                        <Text fontWeight='bold'> {item.title.slice(0, 30)} </Text>
                        <Text color='rgb(134, 142, 150)'>{item.body.slice(0, 66)}</Text>
                     </Box>
                  </Box>
                  <Box  >
                     <ButtonGroup variant='solid' spacing='6'>
                        <IconButton
                           colorScheme='blue'
                           aria-label='detail'
                           icon={<EditIcon />}
                        // sx={{ cursor: 'not-allowed' }}
                        />
                        <IconButton
                           colorScheme='green'
                           aria-label='edit'
                           icon={<EditIcon />}
                        />
                        <IconButton
                           colorScheme='red'
                           aria-label='delete'
                           icon={<DeleteIcon />}
                        />
                     </ButtonGroup>
                  </Box>
               </SimpleGrid>
            )
         })}
      </Box>
   )
}

export default Todos