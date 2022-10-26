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
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  const story = await res.json() as Response

  const numOfComments = (story.kids ?? []).length
  const { host: domain } = new URL(story.url)
  const time = HowLongAgo(story.time * 1000)

  return {
    ...story,
    numOfComments,
    domain,
    time
  }
}