import type { Link } from '#shared/schemas/link'
import { escape } from 'es-toolkit/string'
import { parseURL } from 'ufo'

const CLOAKING_IFRAME_SANDBOX = [
  'allow-scripts',
  'allow-same-origin',
  'allow-forms',
  'allow-popups',
  'allow-popups-to-escape-sandbox',
  'allow-top-navigation-by-user-activation',
  'allow-downloads',
  'allow-modals',
].join(' ')

function buildMetaTags(link: Link, baseUrl: string) {
  const { host: hostname } = parseURL(link.url)
  const title = link.title || hostname || 'Link'
  const hasImage = !!link.image
  const imageUrl = hasImage && link.image!.startsWith('/')
    ? `${baseUrl}${link.image}`
    : link.image
  const twitterCard = hasImage ? 'summary_large_image' : 'summary'

  const tags = [
    link.description ? `<meta name="description" content="${escape(link.description)}">` : '',
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${escape(baseUrl)}/${escape(link.slug)}">`,
    `<meta property="og:title" content="${escape(title)}">`,
    link.description ? `<meta property="og:description" content="${escape(link.description)}">` : '',
    hasImage ? `<meta property="og:image" content="${escape(imageUrl!)}">` : '',
    `<meta name="twitter:card" content="${twitterCard}">`,
    `<meta name="twitter:title" content="${escape(title)}">`,
    link.description ? `<meta name="twitter:description" content="${escape(link.description)}">` : '',
    hasImage ? `<meta name="twitter:image" content="${escape(imageUrl!)}">` : '',
  ].filter(Boolean).join('\n    ')

  return { title, tags }
}

export function generateCloakingHtml(link: Link, targetUrl: string, baseUrl: string): string {
  const { title, tags } = buildMetaTags(link, baseUrl)

  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${escape(title)}</title>
    ${tags}
</head>
<body style="margin:0;overflow:hidden">
    <iframe src="${escape(targetUrl)}" style="width:100%;height:100%;width:100vw;height:100vh;border:none" sandbox="${CLOAKING_IFRAME_SANDBOX}" allowfullscreen referrerpolicy="no-referrer"></iframe>
    <noscript><meta http-equiv="refresh" content="0;url=${escape(targetUrl)}"></noscript>
</body>
</html>`
}

interface PasswordHtmlOptions {
  hasError?: boolean
  locale?: RedirectLocale
}

export function generatePasswordHtml(slug: string, options: PasswordHtmlOptions = {}): string {
  const { hasError = false, locale = 'en-US' } = options
  const t = REDIRECT_TRANSLATIONS[locale]
  return `<!DOCTYPE html>
<html lang="${escape(locale)}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="robots" content="noindex">
    <link rel="icon" href="/favicon.ico" sizes="48x48">
    <title>${escape(t.passwordTitle)}</title>
    <style>
      /*
       * Candy's Cats brand palette: Marea Baja #2E5464, Blithe Blue #90BDBD,
       * Deep Marea #244350, Soft Blithe #D2E4E4, Pale Neutral #EFF5F5.
       */
      :root{color-scheme:light dark;--brand:#2E5464;--brand-deep:#244350;--surface:#ffffff;--page:#EFF5F5;--line:#D2E4E4;--muted:#51717E;--danger:#B42318;--on-brand:#ffffff}
      @media (prefers-color-scheme:dark){:root{--brand:#90BDBD;--brand-deep:#EFF5F5;--surface:#172D37;--page:#0C212A;--line:rgba(239,245,245,.14);--muted:#94AFB2;--danger:#F2938C;--on-brand:#102731}}
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--page);color:var(--brand-deep)}
      .mark{display:block;width:44px;height:44px;margin:0 auto 1rem}
      .card{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:2rem;width:100%;max-width:360px;margin:1rem;box-shadow:0 4px 6px -1px rgba(36,67,80,.08),0 2px 4px -1px rgba(36,67,80,.06)}
      h1{font-size:1.125rem;font-weight:600;margin-bottom:1.5rem;text-align:center;letter-spacing:-.025em;color:var(--brand-deep)}
      .error{color:var(--danger);font-size:.875rem;margin-bottom:1rem;text-align:center;font-weight:500}
      label{display:block;font-size:.875rem;font-weight:500;margin-bottom:.5rem;color:var(--brand-deep)}
      input[type=password]{width:100%;padding:.5rem .75rem;background:var(--surface);border:1px solid var(--line);border-radius:6px;font-size:.875rem;outline:none;color:var(--brand-deep);margin-bottom:1rem;transition:border-color .15s ease,box-shadow .15s ease}
      input[type=password]:focus{border-color:var(--brand);box-shadow:0 0 0 3px rgba(46,84,100,.18)}
      input[type=password]::placeholder{color:var(--muted)}
      button{width:100%;padding:.5rem;background:var(--brand);color:var(--on-brand);border:none;border-radius:6px;font-size:.875rem;font-weight:500;cursor:pointer;transition:background-color .15s ease}
      button:hover{background:var(--brand-deep);color:var(--surface)}
      @media (prefers-color-scheme:dark){button:hover{background:#B2D3D3;color:#102731}}
    </style>
</head>
<body>
    <div class="card">
        <img class="mark" src="/logo-paw.svg" alt="" width="44" height="44">
        <h1>${escape(t.passwordTitle)}</h1>${hasError ? `\n        <p class="error">${escape(t.passwordError)}</p>` : ''}
        <form method="POST" action="/${escape(slug)}">
            <label for="password">${escape(t.passwordLabel)}</label>
            <input type="password" id="password" name="password" required autofocus placeholder="${escape(t.passwordPlaceholder)}">
            <button type="submit">${escape(t.continue)}</button>
        </form>
    </div>
</body>
</html>`
}

interface UnsafeWarningHtmlOptions {
  password?: string
  locale?: RedirectLocale
}

export function generateUnsafeWarningHtml(slug: string, targetUrl: string, options: UnsafeWarningHtmlOptions = {}): string {
  const { password, locale = 'en-US' } = options
  const t = REDIRECT_TRANSLATIONS[locale]
  return `<!DOCTYPE html>
<html lang="${escape(locale)}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="robots" content="noindex">
    <link rel="icon" href="/favicon.ico" sizes="48x48">
    <title>${escape(t.unsafeTitle)}</title>
    <style>
      /*
       * Candy's Cats brand palette: Marea Baja #2E5464, Blithe Blue #90BDBD,
       * Deep Marea #244350, Soft Blithe #D2E4E4, Pale Neutral #EFF5F5.
       */
      :root{color-scheme:light dark;--brand:#2E5464;--brand-deep:#244350;--surface:#ffffff;--page:#EFF5F5;--line:#D2E4E4;--muted:#51717E;--danger:#B42318;--on-brand:#ffffff}
      @media (prefers-color-scheme:dark){:root{--brand:#90BDBD;--brand-deep:#EFF5F5;--surface:#172D37;--page:#0C212A;--line:rgba(239,245,245,.14);--muted:#94AFB2;--danger:#F2938C;--on-brand:#102731}}
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--page);color:var(--brand-deep)}
      .mark{display:block;width:44px;height:44px;margin:0 auto 1rem}
      .card{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:2rem;width:100%;max-width:420px;margin:1rem;box-shadow:0 4px 6px -1px rgba(36,67,80,.08),0 2px 4px -1px rgba(36,67,80,.06)}
      .warning{display:flex;align-items:center;justify-content:center;gap:.75rem;margin-bottom:1rem}
      .warning svg{width:1.5rem;height:1.5rem;color:var(--danger);flex-shrink:0}
      h1{font-size:1.125rem;font-weight:600;letter-spacing:-.025em;color:var(--danger)}
      .desc{font-size:.875rem;color:var(--muted);margin-bottom:1rem;line-height:1.5;text-align:center}
      .url{font-size:.8125rem;color:var(--brand-deep);background:var(--page);border:1px solid var(--line);border-radius:6px;padding:.5rem .75rem;word-break:break-all;margin-bottom:1.5rem;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}
      .actions{display:flex;gap:.75rem}
      .btn{flex:1;padding:.5rem;border-radius:6px;font-size:.875rem;font-weight:500;cursor:pointer;text-align:center;text-decoration:none;border:none;transition:background-color .15s ease}
      .btn-back{border:1px solid var(--line);background:var(--surface);color:var(--brand-deep)}
      .btn-back:hover{background:var(--page)}
      .btn-continue{background:var(--brand);color:var(--on-brand)}
      .btn-continue:hover{background:var(--brand-deep);color:var(--surface)}
      @media (prefers-color-scheme:dark){.btn-continue:hover{background:#B2D3D3;color:#102731}}
    </style>
</head>
<body>
    <div class="card">
        <img class="mark" src="/logo-paw.svg" alt="" width="44" height="44">
        <div class="warning">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
            <h1>${escape(t.unsafeTitle)}</h1>
        </div>
        <p class="desc">${escape(t.unsafeDesc)}</p>
        <div class="url">${escape(targetUrl)}</div>
        <div class="actions">
            <a href="javascript:history.back()" class="btn btn-back">${escape(t.goBack)}</a>
            <form method="POST" action="/${escape(slug)}" style="flex:1;display:flex">
                <input type="hidden" name="confirm" value="true">${password ? `\n                <input type="hidden" name="password" value="${escape(password)}">` : ''}
                <button type="submit" class="btn btn-continue" style="width:100%">${escape(t.continue)}</button>
            </form>
        </div>
    </div>
</body>
</html>`
}

export function generateOgHtml(link: Link, targetUrl: string, baseUrl: string): string {
  const { title, tags } = buildMetaTags(link, baseUrl)

  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${escape(title)}</title>
    ${tags}
    <meta http-equiv="refresh" content="1;url=${escape(targetUrl)}">
</head>
<body>
    <p>Redirecting to <a href="${escape(targetUrl)}">${escape(targetUrl)}</a>...</p>
</body>
</html>`
}
