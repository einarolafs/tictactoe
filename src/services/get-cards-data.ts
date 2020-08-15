import fetchService from './fetch-service'

const getCardsData = async ({ url }: { url: string }): Promise<JSON> => {
  try {
    const data = await fetchService({ url })

    return data
  } catch (error) {
    return error
  }
}

export default getCardsData
