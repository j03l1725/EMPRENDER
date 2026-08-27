import json, sys, urllib.parse, urllib.request

OK = ("cc0", "public domain", "cc by", "cc-by", "pd-", "pdm")

def buscar(q, n=6, minw=1400):
    url = ("https://commons.wikimedia.org/w/api.php?action=query&generator=search"
           f"&gsrsearch={urllib.parse.quote('filetype:bitmap ' + q)}&gsrnamespace=6&gsrlimit=25"
           "&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1600&format=json")
    req = urllib.request.Request(url, headers={"User-Agent": "emprender-landing/1.0 (joelusa25@gmail.com)"})
    try:
        d = json.load(urllib.request.urlopen(req, timeout=35))
    except Exception as e:
        print(f"  (fallo: {e})"); return
    print(f"===== {q}")
    vistos = 0
    for p in (d.get("query", {}).get("pages", {}) or {}).values():
        ii = (p.get("imageinfo") or [{}])[0]
        w, h = ii.get("width", 0), ii.get("height", 0)
        if w < minw or not h or w / h < 1.25: continue
        em = ii.get("extmetadata", {})
        lic = (em.get("LicenseShortName", {}).get("value") or "?")
        if not any(k in lic.lower() for k in OK): continue
        autor = (em.get("Artist", {}).get("value") or "—")
        import re; autor = re.sub(r"<[^>]+>", "", autor)[:45]
        print(f"  [{lic}] {w}x{h} · {p['title'][5:60]}")
        print(f"    {ii.get('thumburl')}")
        print(f"    autor: {autor} · {ii.get('descriptionurl','')[:75]}")
        vistos += 1
        if vistos >= n: break
    if not vistos: print("  (nada que cumpla)")

for q in sys.argv[1:]: buscar(q)
