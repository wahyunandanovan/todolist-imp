import React from 'react'

import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Textarea,
   Button, Box, FormLabel, Input, FormControl, useDisclosure
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";

interface IFormInput {
   title: string;
   descriptions: string;

}

interface Props {
   onSubmitForm: (v: IFormInput) => void
}

function AddTodo({ onSubmitForm }: Props) {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
   const initialRef = React.useRef(null)
   const finalRef = React.useRef(null)


   const onSubmit = (data: IFormInput) => {
      onClose()
      onSubmitForm(data);
   }


   return (
      <Box>
         <Button onClick={onOpen} width='100%' colorScheme='blue'>Add Todo</Button>

         <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
         >
            <ModalOverlay />
            <form onSubmit={handleSubmit(onSubmit)}>
               <ModalContent>
                  <ModalHeader>Add your task</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                     <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input {...register("title", { required: true })} placeholder='your task title' />
                        {errors?.title && <span style={{ color: 'red', fontSize: '14px' }}>*title cannot empty</span>}
                     </FormControl>
                     <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea {...register("descriptions", { required: true })} placeholder='your task descriptions' />
                        {errors?.descriptions && <span style={{ color: 'red', fontSize: '14px' }}>*description cannot empty</span>}

                     </FormControl>
                  </ModalBody>
                  <ModalFooter>
                     <Button colorScheme='blue' mr={3} type='submit'>
                        Save
                     </Button>
                     <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
               </ModalContent>
            </form>
         </Modal>
      </Box>
   )


}


export default AddTodo


