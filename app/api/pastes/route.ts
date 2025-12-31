import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()

  if (!body.content || body.content.trim() === "") {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 })
  }

  if (body.ttl_seconds && body.ttl_seconds < 1) {
    return NextResponse.json({ error: "Invalid ttl_seconds" }, { status: 400 })
  }

  if (body.max_views && body.max_views < 1) {
    return NextResponse.json({ error: "Invalid max_views" }, { status: 400 })
  }

  const expiresAt = body.ttl_seconds
    ? new Date(Date.now() + body.ttl_seconds * 1000)
    : null

  const paste = await prisma.paste.create({
    data: {
      content: body.content,
      expiresAt,
      maxViews: body.max_views ?? null
    }
  })

  return NextResponse.json({
    id: paste.id,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${paste.id}`
  })
}
