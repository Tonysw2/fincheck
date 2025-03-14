export async function sleep(delay = 500) {
  await new Promise((resolve) => setTimeout(resolve, delay))
}
