import { nanoid } from 'nanoid';

export class Note {
  title: string;
  content: string;
  isArchived: boolean;
  readonly id: string;
  readonly createdAt: Date;

  constructor(
    id: string,
    title: string,
    content: string,
    createdAt: Date,
    isArchived: boolean
  ) {
    this.id = id;
    this.title = title.trim().toUpperCase();
    this.content = content.trim().toUpperCase();
    this.createdAt = createdAt;
    this.isArchived = isArchived;
  }
}

export const factoryNote = (
  title: string,
  content: string,
  isArchived = false
) => {
  const id = nanoid();
  const currentDate = new Date();

  return new Note(
    id,
    title.trim().toUpperCase(),
    content.trim().toUpperCase(),
    currentDate,
    isArchived
  );
};
