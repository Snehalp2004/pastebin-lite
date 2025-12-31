import { prisma } from "../../../../lib/prisma";
import { now } from "../../../../lib/time";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // <-- Note the Promise wrapper
) {
  const { id } = await context.params; // unwrap the Promise

  const paste = await prisma.paste.findUnique({
    where: { id }
  });

  if (!paste) return NextResponse.json({}, { status: 404 });

  const currentTime = now(req);

  if (paste.expiresAt && currentTime > paste.expiresAt)
    return NextResponse.json({}, { status: 404 });

  if (paste.maxViews && paste.viewCount >= paste.maxViews)
    return NextResponse.json({}, { status: 404 });

  const updated = await prisma.paste.update({
    where: { id: paste.id },
    data: { viewCount: { increment: 1 } }
  });

  return NextResponse.json({
    content: updated.content,
    remaining_views: updated.maxViews
      ? updated.maxViews - updated.viewCount
      : null,
    expires_at: updated.expiresAt
  });
}
