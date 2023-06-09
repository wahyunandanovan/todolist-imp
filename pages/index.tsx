import React from 'react'
//C0MPONENTS
import Head from 'next/head'
import AddTodo from '@/components/AddTodo'
import Todos from '@/components/Todos'
import Modal from '@/components/Modal'
import { PostsInterface } from '@/interfaces/PostsInterface'
import { Center, Card, Text, useDisclosure } from '@chakra-ui/react'
//UTILITIES
import axios from 'axios'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'

interface IFormInput {
  title: string;
  descriptions: string;

}

const fetchPosts = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts })

  const newData = data?.slice(0, 3)

  const [todos, setTodos] = React.useState(newData)

  const randomId = Math.floor(Math.random() * 98765432123456789)

  //ADD TODO
  const _onSubmit = (v: IFormInput) => {
    const initialData = [...todos]
    const value: PostsInterface = {
      title: v.title,
      body: v.descriptions,
      id: randomId,
      userId: 1671
    }
    initialData.push(value)
    setTodos(initialData)

  }
  //DETAIL TODO
  const [selectedTodo, setSelectedTodo] = React.useState<PostsInterface>()
  const _onDetail = (v: PostsInterface) => {
    setIsEdit(false)
    setSelectedTodo(v)
    onOpen()
  }

  //EDIT TODO
  const [isEdit, setIsEdit] = React.useState(false)
  const [isEditItem, setIsEditItem] = React.useState<PostsInterface>()
  const _onEdit = async (v: PostsInterface) => {
    await setIsEditItem(v)
    await setIsEdit(true)
    onOpen()
  }

  //DELETE TODO
  const _onDelete = (e: PostsInterface) => {
    const initialData = [...todos]
    const results = initialData.filter((v: PostsInterface) => v.id !== e.id)
    setTodos(results)

  }

  //SUBMIT EDITING 
  const _onSubmitEditing = (v: IFormInput) => {
    const todoData = [...todos]
    const initialData = { ...isEditItem }
    const res = todoData?.findIndex((td: PostsInterface) => {
      return td.id === initialData.id
    })
    const newTodoData = {
      ...initialData,
      title: v.title,
      body: v.descriptions
    }
    todoData[res] = newTodoData
    setTodos(todoData)
    onClose()
  }

  return (
    <>
      <Head>
        <title>Tes Front End Developer PT Informatika Media Pratama</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h='100vh' color='white' sx={{ backgroundImage: '#fff' }}>
        <Card p={8} w={[350, 450, 600]} >
          <Text fontSize='2xl' color='#000' textAlign='start' fontWeight='700'>Todo App</Text>
          <Todos data={todos} onEdit={(v) => _onEdit(v)} onDelete={(v) => _onDelete(v)} onDetail={(v) => _onDetail(v)} />
          <AddTodo onSubmitForm={(v) => _onSubmit(v)} />
        </Card>
      </Center>
      <Modal
        isForm={isEdit}
        onSubmitForm={(v: IFormInput) => _onSubmitEditing(v)}
        title='Details'
        openModal={isOpen}
        closeModal={onClose}
        itemTitle={selectedTodo?.title}
        itemBody={selectedTodo?.body}
        data={isEditItem}
      />
    </>
  )
}
export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['posts'], fetchPosts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
