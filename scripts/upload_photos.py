#!/usr/bin/env python3
"""
Upload photos from 'tof ben daoud' folder to GitHub:
- 4 slider images → public/slide1.jpg, slide3.jpg, slide4.jpg, slide5.jpg
- 14 product images → public/uploads/productid.jpg
- Update data/store.json with new image URLs
"""

import os, json, base64, subprocess, urllib.request, urllib.error, tempfile

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")
GITHUB_REPO  = "anir1977/bendaoudpro"
BRANCH       = "main"
BASE         = "https://api.github.com"
PHOTOS_DIR   = os.path.expanduser("~/Desktop/tof ben daoud ")
RAW_BASE     = f"https://raw.githubusercontent.com/{GITHUB_REPO}/{BRANCH}"

def gh_headers():
    return {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
    }

def get_sha(path):
    url = f"{BASE}/repos/{GITHUB_REPO}/contents/{path}?ref={BRANCH}"
    req = urllib.request.Request(url, headers=gh_headers())
    try:
        with urllib.request.urlopen(req) as r:
            data = json.loads(r.read())
            return data.get("sha")
    except:
        return None

def upload_to_github(repo_path, b64_content, message):
    sha = get_sha(repo_path)
    body = {"message": message, "content": b64_content, "branch": BRANCH}
    if sha:
        body["sha"] = sha
    data = json.dumps(body).encode()
    url = f"{BASE}/repos/{GITHUB_REPO}/contents/{repo_path}"
    req = urllib.request.Request(url, data=data, headers=gh_headers(), method="PUT")
    try:
        with urllib.request.urlopen(req) as r:
            return r.status in (200, 201)
    except urllib.error.HTTPError as e:
        print(f"  ❌ HTTP {e.code}: {e.read().decode()[:200]}")
        return False

def photo_to_b64(photo_name, max_px=1200, quality=85):
    """Convert PNG to JPEG using sips, return base64."""
    src = os.path.join(PHOTOS_DIR, photo_name)
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tf:
        tmp = tf.name
    try:
        subprocess.run([
            "sips", "-s", "format", "jpeg",
            "-s", "formatOptions", str(quality),
            "-Z", str(max_px),
            src, "--out", tmp
        ], check=True, capture_output=True)
        with open(tmp, "rb") as f:
            return base64.b64encode(f.read()).decode()
    finally:
        os.unlink(tmp)

def get_store():
    url = f"{BASE}/repos/{GITHUB_REPO}/contents/data/store.json?ref={BRANCH}"
    req = urllib.request.Request(url, headers=gh_headers())
    with urllib.request.urlopen(req) as r:
        data = json.loads(r.read())
        content = base64.b64decode(data["content"]).decode("utf-8")
        return json.loads(content)

def save_store(store):
    content = base64.b64encode(json.dumps(store, indent=2, ensure_ascii=False).encode()).decode()
    return upload_to_github("data/store.json", content, "chore: update product images with real photos")

# ── Slider mapping ────────────────────────────────────────────────────────────
SLIDER = {
    "public/slide1.jpg": "Collier de luxe Ben Daoud.png",
    "public/slide3.jpg": "Bracelet en or 18k sur fond floral (2).png",
    "public/slide4.jpg": "Boucles d'oreilles en or et diamant (1).png",
    "public/slide5.jpg": "Bijoux en or rose sur fond vert.png",
}

# ── Product mapping: product_id → photo filename ─────────────────────────────
PRODUCTS = {
    "col-001": "Collier byzantin en or élégant.png",
    "col-002": "Collier doré avec pendentif lune.png",
    "col-003": "Collier en or avec onyx et diamants.png",
    "bag-001": "Bague en or de luxe.png",
    "bag-002": "Bague élégante en or et diamants.png",
    "bra-001": "Bracelets en or aux accents de diamant.png",
    "bra-002": "Bracelet tricolore de Ben Daoud.png",
    "mar-001": "Bagues en or 18k en détail.png",
    "mar-002": "Bague de fiançailles en or jaune.png",
    "gou-001": "Bangle en or et filigrane.png",
    "gou-002": "1ab71a9c-c3dc-4a78-b4f9-ec95758f2ce3.png",
    "bou-001": "Boucles d'oreilles en or 18k.png",
    "bou-002": "Pendentif clé en or rose élégant.png",
    "bro-001": "67f19f0e-5f81-4535-9c53-4fa561a65df8.png",
}

if __name__ == "__main__":
    print("=" * 60)
    print("Upload photos Ben Daoud → GitHub")
    print("=" * 60)

    # ── 1. Slider ──────────────────────────────────────────────────
    print("\n📸 SLIDER (4 images):")
    for repo_path, photo in SLIDER.items():
        print(f"  {photo} → {repo_path} ...", end=" ", flush=True)
        b64 = photo_to_b64(photo, max_px=1400, quality=88)
        ok = upload_to_github(repo_path, b64, f"slider: update {repo_path.split('/')[-1]}")
        print("✅" if ok else "❌")

    # ── 2. Products ────────────────────────────────────────────────
    print("\n🏷️  PRODUITS (bijoux):")
    product_urls = {}
    for prod_id, photo in PRODUCTS.items():
        repo_path = f"public/uploads/{prod_id}.jpg"
        print(f"  {prod_id} ← {photo[:40]} ...", end=" ", flush=True)
        b64 = photo_to_b64(photo, max_px=900, quality=85)
        ok = upload_to_github(repo_path, b64, f"upload: product image {prod_id}")
        if ok:
            product_urls[prod_id] = f"{RAW_BASE}/{repo_path}"
            print("✅")
        else:
            print("❌ (image non modifiée)")

    # ── 3. Update store.json ───────────────────────────────────────
    print("\n💾 Mise à jour store.json ...")
    store = get_store()

    for bijou in store["bijoux"]:
        if bijou["id"] in product_urls:
            bijou["image"] = product_urls[bijou["id"]]

    ok = save_store(store)
    print("  store.json →", "✅ sauvegardé" if ok else "❌ erreur")

    print("\n✅ Terminé ! Lance un redéploiement Vercel pour le slider.")
    print("   Les images produits (raw GitHub) sont disponibles immédiatement.")
