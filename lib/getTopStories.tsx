
type Stories = number[];

export async function getTopStories(): Promise<Stories> {
  const url = `https://hacker-news.firebaseio.com/v0/topstories.json`
  // cache for 1 minute
  const res = await fetch(url, { next: { revalidate: 60 } });
  const allStories = await res.json();
  const stories = allStories.slice(0, 10)
  return stories
}
