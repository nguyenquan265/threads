export const checkBase64Image = (base64String: string) => {
  const base64ImagePattern = /^data:image\/(png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/=]+$/

  return base64ImagePattern.test(base64String)
}

export const getBase64Size = (base64String: string) => {
  const padding = (base64String.match(/=/g) || []).length
  const base64Length = base64String.length
  const sizeInBytes = (base64Length * 3) / 4 - padding
  const sizeInMB = sizeInBytes / (1024 * 1024)

  return sizeInMB
}
