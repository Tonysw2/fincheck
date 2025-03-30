import { httpClient } from '../http-client'

interface CreateParams {
  name: string
  color: string
  initialBalance: number
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

export async function create({
  name,
  initialBalance,
  type,
  color,
}: CreateParams) {
  try {
    const response = await httpClient.post('/bank-accounts', {
      name,
      initialBalance,
      type,
      color,
    })
    return response.data
  } catch (error) {
    console.error('Error creating bank account:', error)
  }
}
