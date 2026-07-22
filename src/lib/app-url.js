const DEFAULT_APP_URL = "https://app.brick.lat/"

function getConfiguredAppUrl() {
  const url = new URL(import.meta.env.VITE_APP_URL || DEFAULT_APP_URL)
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("VITE_APP_URL debe usar HTTP o HTTPS.")
  }
  return url
}

export function createAppUrl(pathname, searchParams = {}) {
  const url = new URL(pathname, getConfiguredAppUrl())
  for (const [key, value] of Object.entries(searchParams)) {
    url.searchParams.set(key, value)
  }
  return url.toString()
}
