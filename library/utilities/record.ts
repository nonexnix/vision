type IRecord = (endpoint: string, action: 'CREATE' | 'UPDATE' | 'DELETE', payload: any) => void

const record: IRecord = async (endpoint, action, payload) => {
  switch (action) {
    case 'CREATE':
      await fetch(`/api/${endpoint}/create`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      break
    case 'UPDATE':
      await fetch(`/api/${endpoint}/update`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      break
    case 'DELETE': {
      await fetch(`/api/${endpoint}/delete`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
      })
      break
    }
  }
}

export default record
