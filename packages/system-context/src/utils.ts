export const loadManifest = (namespace: string, manifest) => {
  const { entrypoints } = manifest
  const scriptUris = Object.keys(entrypoints).map(k => entrypoints[k].assets)
  .filter(assets => Array.isArray(assets))
  .reduce((acc, assets) => acc.concat(assets), [])
  .map(uri => `/${namespace}/${uri}`)

  const lastScriptPromise = scriptUris.reduce((last, uri) => {
    return last.then(() => {
      return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script')
        scriptElement.src = uri
        scriptElement.onload = resolve
        scriptElement.onerror = reject
        document.body.insertBefore(scriptElement, document.body.firstChild)
      })
    })

  }, Promise.resolve())

  return lastScriptPromise
}