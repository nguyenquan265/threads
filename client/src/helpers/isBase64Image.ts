const isBase64Image = (imageData: string) => {
  const base64Regex = /^data:image\/(png|jpg|jpeg|gif|webp);base64,/
  return base64Regex.test(imageData)
}

export default isBase64Image
