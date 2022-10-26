import HowLongAgo from "@nwylynko/how-long-ago"

type Stories = number[]

async function getTopStories(): Promise<Stories> {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`);
  return res.json();
}

export default async function Page() {

  const data = await getTopStories()
  const initial = data.slice(0, 10)

  return (
    <main>
      {
        initial.map((id, index) => (
          <Item key={id} id={id} index={index} />
        ))
      }
    </main>
  )
}

type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
}

async function getStory(id: number): Promise<Story> {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  return res.json();
}

async function Item({ id, index }: { id: number, index: number }) {

  const story = await getStory(id);
  const numOfComments = (story.kids ?? []).length
  const { host: domain } = new URL(story.url)
  const time = HowLongAgo(story.time * 1000)

  return (
    <div style={{ margin: 8 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <span>{index + 1}.</span>
        <h4 style={{ margin: 0 }}>{story.title}</h4>
        <span>({domain})</span>
      </div>
      <div>
        <span>{story.score} points by {story.by} at {time} | {numOfComments} comments</span>
      </div>
    </div>
    )

}
