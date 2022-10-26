
type Stories = number[];

export async function getTopStories(): Promise<Stories> {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`);
  return res.json();
}
