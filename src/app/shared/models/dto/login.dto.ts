import {Post} from './post.model';

export class LoginDTO {
  user: any;
  token: string;
  postsOfOtherUsers: Post[];
  postsOfFriends: any;
  chatChannels: any;

}
