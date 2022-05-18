const fetcher = async ({ key, id }: { key: string; id: string }) => {
  return await fetch(key, {
    method: 'POST',
    body: JSON.stringify({ id }),
  }).then((response) => response.json())
}

export default fetcher
