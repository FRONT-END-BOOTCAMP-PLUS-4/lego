export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL!}/auth/kakao/callback`,
    code: code ?? "",
  });

  const kakaoRes = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body,
  });

  const data = await kakaoRes.json();

  return new Response(JSON.stringify(data), { status: 200 });
}
