const ONE_DAY_SECONDS = 24 * 60 * 60

export function setCookie(name: string, value: string, maxAgeSeconds: number = ONE_DAY_SECONDS): void {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`
}

export function getCookie(name: string): string | null {
  const encodedName = `${encodeURIComponent(name)}=`
  const parts = document.cookie.split(';')

  for (const rawPart of parts) {
    const part = rawPart.trim()
    if (part.startsWith(encodedName)) {
      return decodeURIComponent(part.substring(encodedName.length))
    }
  }

  return null
}

export function deleteCookie(name: string): void {
  document.cookie = `${encodeURIComponent(name)}=; path=/; max-age=0; samesite=lax`
}