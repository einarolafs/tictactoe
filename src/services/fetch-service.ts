type FetchProps = {
  url: string
  method?: 'GET' | 'PUT' | 'POST' | 'DELETE'
  body?: BodyInit
  headers?: Headers
}

const fetchService = async ({ url, method = 'GET', headers, body }: FetchProps): Promise<JSON> => {
  try {
    const response = await window.fetch(url, { method, headers, body })

    if (!response.ok) {
      throw new Error(`${response.status}`)
    }
    const content = response.json()

    return content
  } catch (error) {
    return error
  }
}

export default fetchService
