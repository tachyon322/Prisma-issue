// app/api/test/route.ts
export async function GET() {
    return new Response(JSON.stringify({ message: "Success" }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }