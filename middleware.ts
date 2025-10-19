import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block access to the archive route while it's unfinished.
  if (pathname === '/archive' || pathname.startsWith('/archive/')) {
    const body = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Archive — Coming Soon</title>
          <style>
            :root{--bg1:#030006;--bg2:#07101a;--glass:rgba(255,255,255,0.04);--accent:#7df9ff}
            html,body{height:100%;margin:0;background:radial-gradient(1200px 600px at 10% 20%, rgba(125,249,255,0.02), transparent), linear-gradient(180deg,var(--bg1),var(--bg2));color:#e6eef3;font-family:Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial}
            .wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:48px;box-sizing:border-box}
            .card{position:relative;max-width:760px;width:100%;padding:32px;border-radius:14px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border:1px solid rgba(125,249,255,0.06);backdrop-filter: blur(8px);box-shadow: 0 8px 40px rgba(2,6,23,0.6)}
            .accent{position:absolute;inset:-2px;border-radius:16px;padding:2px;pointer-events:none}
            .accent:before{content:"";position:absolute;inset:0;border-radius:14px;background:linear-gradient(90deg, transparent, rgba(125,249,255,0.18), transparent);filter:blur(8px);opacity:0.9;animation: glow 3.6s linear infinite}
            @keyframes glow{0%{transform:translateX(-20%)}50%{transform:translateX(20%)}100%{transform:translateX(-20%)}}
            h1{margin:0 0 8px 0;font-size:22px;letter-spacing:-0.4px;color:#fff}
            .lead{margin:0 0 16px 0;color:rgba(230,238,243,0.9)}
            .desc{margin:0 0 18px 0;color:rgba(230,238,243,0.72);line-height:1.5}
            .cta{display:inline-flex;gap:10px;align-items:center}
            .btn{background:linear-gradient(90deg, rgba(125,249,255,0.12), rgba(125,249,255,0.06));color:var(--accent);padding:10px 14px;border-radius:10px;border:1px solid rgba(125,249,255,0.14);text-decoration:none;font-weight:600;box-shadow: 0 6px 18px rgba(12,18,28,0.6);backdrop-filter: blur(6px)}
            .muted{color:rgba(230,238,243,0.5);font-size:13px;margin-top:12px}
            .logo{position:absolute;right:18px;top:18px;color:rgba(125,249,255,0.18);font-weight:700}
            @media (max-width:640px){.card{padding:20px;border-radius:12px}.logo{display:none}}
          </style>
        </head>
        <body>
          <div class="wrap">
            <div class="card" role="dialog" aria-labelledby="archive-title" aria-describedby="archive-desc">
              <div class="accent" aria-hidden="true"></div>
              <div class="logo">Archive</div>
              <h1 id="archive-title">Archive — đang được phát triển</h1>
              <div class="lead" id="archive-desc">Trang lưu trữ (archive) hiện chưa hoàn thiện. Chúng tôi đang hoàn thiện nội dung và sẽ mở lại sớm.</div>
              <p class="desc">Cảm ơn bạn đã ghé thăm — nếu cần, bạn có thể quay về trang chính hoặc liên hệ để biết thêm thông tin.</p>
              <div class="cta">
                <a class="btn" href="/">Quay về trang chủ</a>
                <a class="btn" href="/contact">Liên hệ</a>
              </div>
              <div class="muted">Nếu bạn là người quản trị và cần truy cập, cho mình biết để bật quyền tạm thời.</div>
            </div>
          </div>
        </body>
      </html>
    `;

    return new Response(body, { status: 403, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }

  return NextResponse.next();
}

// Limit middleware to archive routes only for performance
export const config = {
  matcher: ['/archive', '/archive/:path*'],
};
