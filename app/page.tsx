import Link from "next/link";
import { getStory } from "../lib/getStory";
import { getTopStories } from "../lib/getTopStories";
import { Time } from "./Time";

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

  const website = `https://news.ycombinator.com/from?site=${story.domain}`
  const userUrl = `https://news.ycombinator.com/user?id=${story.by}`
  const itemUrl = `https://news.ycombinator.com/item?id=${id}`

  return (
    <div style={{ margin: 8 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <span>{index + 1}.</span>
        <Link href={story.url} style={{ color: "black", textDecoration: "none" }}>
          <h4 style={{ margin: 0 }}>{story.title}</h4>
        </Link>
        <span>
          (
          <Link style={{ color: "black" }} href={website}>
            {story.domain}
          </Link>
          )
        </span>
      </div>
      <div>
        <span>{story.score} points by <Link href={userUrl} style={{ color: "black" }}>{story.by}</Link> at <Time timestamp={story.time} /> | <Link href={itemUrl} style={{ color: "black" }}>{story.numOfComments} comments</Link></span>
      </div>
    </div>
  )

}
