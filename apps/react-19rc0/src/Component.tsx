"use client";

import { use } from 'react';

export type Story = {
  objectID: string;
  url: string;
  title: string;
};

export const Component = ({fetchHackerNews}: {fetchHackerNews: Promise<Story[]>}) => {
  const data = use(fetchHackerNews)

	return (
    <ul>
      {data.slice(0, 10).map((story) => (
        <li key={story.objectID}>
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            {story.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
