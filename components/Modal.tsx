import {
   Modal as ChakraModal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalCloseButton,
   Text,
   FormControl,
   FormLabel,
   Textarea,
   ModalFooter,
   Button,
   Input
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import React from 'react';

interface IFormInput {
   title: string;
   descriptions: string;

}

interface Props {
   onSubmitForm: (v: IFormInput) => void
}

export default function Modal({ openModal, closeModal, title, itemTitle, itemBody, isForm, onCloseForm, data }: any) {
   const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();


   const onSubmit = (data: IFormInput) => {
      // onSubmitForm(data);
   }

   React.useEffect(() => {
      let defaultValues: IFormInput | any = {};
      defaultValues.title = data?.title;
      defaultValues.descriptions = data?.body;
      reset({ ...defaultValues });
   }, []);

   return (
      <>
         <ChakraModal isOpen={openModal} onClose={closeModal}>
            <ModalOverlay />
            {isForm ? (
               <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalContent>
                     <ModalHeader>Edit your task</ModalHeader>
                     <ModalCloseButton />
                     <ModalBody pb={6}>
                        <FormControl>
                           <FormLabel>Title</FormLabel>
                           <Input {...register("title", { required: true, })} placeholder='your task title' />
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
                        <Button onClick={onCloseForm}>Cancel</Button>
                     </ModalFooter>
                  </ModalContent>
               </form>
            ) : (
               <ModalContent>
                  <ModalHeader> {title} </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <Text fontWeight='bold'>Title :</Text>
                     <Text color='rgb(134, 142, 150)'>{itemTitle}</Text>
                     <br />
                     <Text fontWeight='bold'>Descriptions :</Text>
                     <Text color='rgb(134, 142, 150)'>{itemBody}</Text>
                     <br />

                  </ModalBody>

               </ModalContent>
            )}
         </ChakraModal>
      </>
   )
}