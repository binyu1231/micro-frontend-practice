export function downloadAsFile (content: Blob, filename: string) {
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(content)
  link.download = filename
  link.click()
}

export function downloadAsCsv (content: string, filename: string): void {
  content = '\ufeff' + content
  const blob = new Blob([content], { type: 'text/csv,charset=UTF-8' })
  return downloadAsFile(blob, filename + '.csv')
}