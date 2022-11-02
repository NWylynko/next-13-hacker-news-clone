import Link from "next/link";
import { getStory } from "../lib/getStory";
import { getTopStories } from "../lib/getTopStories";

export default async function Page() {

  const stories = await getTopStories()

  return (
    <main>
      {
        stories.map((id, index) => (
          <Item key={id} id={id} index={index} />
        ))
      }
    </main>
  )
}

async function Item({ id, index }: { id: number, index: number }) {

  const story = await getStory(id);

  return (
    <div style={{ margin: 8 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <span>{index + 1}.</span>
        <Link href={story.url} style={{ color: "black", textDecoration: "none" }}>
          <h4 style={{ margin: 0 }}>{story.title}</h4>
        </Link>
        <span>
          (
            <Link style={{ color: "black" }} href={`https://news.ycombinator.com/from?site=${story.domain}`}>
              {story.domain}
            </Link>
          )
        </span>
      </div>
      <div>
        <span>{story.score} points by <Link href={`https://news.ycombinator.com/user?id=${story.by}`} style={{ color: "black" }}>{story.by}</Link> at {story.time} | <Link href={`https://news.ycombinator.com/item?id=${id}`} style={{ color: "black" }}>{story.numOfComments} comments</Link></span>
      </div>
    </div>
  )

}
