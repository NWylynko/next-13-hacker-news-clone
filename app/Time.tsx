"use client";

import HowLongAgo from "@nwylynko/how-long-ago"

// need to use a client component here so the time is local to the user

interface TimeProps {
  timestamp: number;
}

export const Time = ({ timestamp }: TimeProps) => {
  const time = HowLongAgo(timestamp * 1000)

  return <span>{time}</span>
}