import { useState } from 'react'
import Form from '@/components/Form'
import { type ResponseData } from '@/types/responseData'
import ResponseCard from '@/components/ResponseCard'

export default function Home() {

  const [apiResponse, setApiResponse] = useState<ResponseData | null>(null)

  return (
    <main>
      <Form setApiResponse={setApiResponse} />

      {/* {apiResponse && <ResponseCard data={apiResponse.data} />} */}

    </main>
  )
}
