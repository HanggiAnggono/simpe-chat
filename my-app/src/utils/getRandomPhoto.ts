export default function getRandomPhotoUrl(id?: string): string {
  return `https://picsum.photos/200/300?random=${id || Math.random()}`;
}
