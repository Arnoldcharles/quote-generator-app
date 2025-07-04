export async function GET() {
  try {
    const res = await fetch('https://api.adviceslip.com/advice', {
      cache: 'no-store'
    })
    const json = await res.json()
    const data = {
      content: json.slip.advice,
      author: 'Anonymous'
    }
    return Response.json(data)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch advice' }, { status: 500 })
  }
}
