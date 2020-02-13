export function download (content: any, filename?: string) {
  const link = document.createElement('a')
  link.href = content
  link.download = filename
  link.click()
}

export function downloadAsFile (content: Blob, filename: string) {
  return download(window.URL.createObjectURL(content), filename)
}

export function downloadAsCsv (content: string, filename: string): void {
  content = '\ufeff' + content
  const blob = new Blob([content], { type: 'text/csv,charset=UTF-8' })
  return downloadAsFile(blob, filename + '.csv')
}