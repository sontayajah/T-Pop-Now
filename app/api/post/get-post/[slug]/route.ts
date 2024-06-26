import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const post = await db.post.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        author: {
          include: {
            profile: {
              include: {
                verifyType: true,
              },
            },
          },
        },
        tags: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while editing the post",
      },
      { status: 500 },
    );
  }
}
