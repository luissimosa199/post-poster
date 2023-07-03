import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

import Form from '@/components/Form'
import ResponseCard from '@/components/ResponseCard'

import { type ResponseData } from '@/types/responseData'


export default function Home() {

  const [apiResponse, setApiResponse] = useState<ResponseData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <main>
      <Form setApiResponse={setApiResponse} setIsLoading={setIsLoading} />

      { isLoading && <div className="max-w-lg md:w-96 my-12 mx-auto flex justify-center items-center"><CircularProgress/></div> }

      {apiResponse && <ResponseCard data={apiResponse.data} />}

    </main>
  )
}
