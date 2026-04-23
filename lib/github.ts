/**
 * GitHub API helpers — persist store.json and upload images
 * Uses GITHUB_TOKEN + GITHUB_REPO env vars already configured on Vercel
 */

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REPO  = process.env.GITHUB_REPO   // "anir1977/bendaoudpro"
const BRANCH       = 'main'
const BASE         = 'https://api.github.com'

function headers() {
  return {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }
}

// ── Get SHA of an existing file ───────────────────────────────────────────────
async function getFileSha(path: string): Promise<string | null> {
  const res = await fetch(`${BASE}/repos/${GITHUB_REPO}/contents/${path}?ref=${BRANCH}`, {
    headers: headers(), cache: 'no-store',
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.sha ?? null
}

// ── Write any file to the repo ────────────────────────────────────────────────
export async function writeFileToGitHub(
  path: string,
  contentBase64: string,
  message: string,
): Promise<boolean> {
  if (!GITHUB_TOKEN || !GITHUB_REPO) return false
  try {
    const sha = await getFileSha(path)
    const body: Record<string, string> = { message, content: contentBase64, branch: BRANCH }
    if (sha) body.sha = sha

    const res = await fetch(`${BASE}/repos/${GITHUB_REPO}/contents/${path}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(body),
    })
    return res.ok
  } catch { return false }
}

// ── Read a file from the repo ─────────────────────────────────────────────────
export async function readFileFromGitHub(path: string): Promise<string | null> {
  if (!GITHUB_TOKEN || !GITHUB_REPO) return null
  try {
    const res = await fetch(`${BASE}/repos/${GITHUB_REPO}/contents/${path}?ref=${BRANCH}`, {
      headers: headers(), cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    return Buffer.from(data.content, 'base64').toString('utf-8')
  } catch { return null }
}

// ── Read store.json from GitHub ───────────────────────────────────────────────
export async function readStoreFromGitHub(): Promise<{ bijoux: unknown[]; montres: unknown[] } | null> {
  const text = await readFileFromGitHub('data/store.json')
  if (!text) return null
  try { return JSON.parse(text) } catch { return null }
}

// ── Save store.json to GitHub ─────────────────────────────────────────────────
export async function saveStoreToGitHub(store: object): Promise<boolean> {
  const content = Buffer.from(JSON.stringify(store, null, 2)).toString('base64')
  return writeFileToGitHub('data/store.json', content, 'chore: update store')
}

// ── Upload an image (base64) → public/uploads/ ────────────────────────────────
// Returns the raw GitHub CDN URL (available immediately after commit, no redeploy needed)
export async function uploadImageToGitHub(
  base64Data: string,   // pure base64 without data: prefix
  filename: string,
): Promise<string | null> {
  const path = `public/uploads/${filename}`
  const ok = await writeFileToGitHub(path, base64Data, `upload: ${filename}`)
  if (!ok) return null
  // Use raw GitHub URL — available within seconds, no Vercel redeploy needed
  const [owner, repo] = (GITHUB_REPO ?? '').split('/')
  return `https://raw.githubusercontent.com/${owner}/${repo}/${BRANCH}/${path}`
}

// ── Trigger Vercel redeploy (optional) ───────────────────────────────────────
export async function triggerDeploy(): Promise<void> {
  const hook = process.env.VERCEL_DEPLOY_HOOK
  if (hook) { try { await fetch(hook, { method: 'POST' }) } catch {} }
}
