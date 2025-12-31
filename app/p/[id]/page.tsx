import { prisma } from "../../../lib/prisma"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {
  const paste = await prisma.paste.findUnique({
    where: { id: params.id }
  })

  if (!paste) notFound()

  if (paste.expiresAt && new Date() > paste.expiresAt) notFound()
  if (paste.maxViews && paste.viewCount >= paste.maxViews) notFound()

  await prisma.paste.update({
    where: { id: paste.id },
    data: { viewCount: { increment: 1 } }
  })

  return (
    <pre style={{ whiteSpace: "pre-wrap", padding: "20px" }}>
      {paste.content}
    </pre>
  )
}
