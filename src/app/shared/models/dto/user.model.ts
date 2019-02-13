import {Post} from './post.model';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImageUrl: string;
  online: boolean;
  postsOfOtherUsers: Post[];
  followers: User[];
  following: User[];
  posts: Post[];
  sharedPosts: any;
}
