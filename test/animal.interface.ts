export default interface Animal {
  id: number,
  organization: string,
  status: string | null,
  image_url: string | null,
  comments: string | null,
  mod_time: string | null,
}
