export class Post {
  id: number;
  title: string;
  description: string;
  photo: string;
  createdTime: string;
  updatedAt: string;
  totalLikes: number;
  totalComments: number;
  comments: Comment[];
  likes: any[];
  shared: boolean;
  totalCommments: number;
}
