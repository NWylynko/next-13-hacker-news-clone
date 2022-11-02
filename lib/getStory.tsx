import HowLongAgo from "@nwylynko/how-long-ago"

type Response = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
};

export async function getStory(id: number) {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  // cache for 1 minute
  const res = await fetch(url, { next: { revalidate: 60 } });
  const story = await res.json() as Response

  const numOfComments = (story.kids ?? []).length
  const { host: domain } = new URL(story.url)

  return {
    ...story,
    numOfComments,
    domain,
  }
}