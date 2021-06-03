import { reactive } from "vue"
// import { todayPost, thisWeekPost, thisMonthPost } from "@/mock"
import { Post } from "@/types"
import axios from "axios"

interface PostState {
  ids: string[],
  all: Record<string, Post>,
  isLoaded: boolean,
}

interface State {
  posts: PostState
}

const initPostState = (): PostState => ({
  ids: [
    // todayPost.id.toString(),
    // thisWeekPost.id.toString(),
    // thisMonthPost.id.toString(),
  ],
  all: {
    // [todayPost.id]: todayPost,
    // [thisWeekPost.id]: thisWeekPost,
    // [thisMonthPost.id]: thisMonthPost,
  },
  isLoaded: false
})

const initState = (): State => ({ posts: initPostState() })

class Store {
  protected state: State

  constructor(initialState: State) {
    this.state = reactive(initialState)
  }

  public getState(): State {
    return this.state
  }

  async fetchPosts() {
    const res = await axios.get<Post[]>("/Posts")
    const ids: string[] = []
    const all: Record<string, Post> = {}

    for (const Post of res.data) {
      ids.push(Post.id.toString())
      all[Post.id] = Post
    }

    this.state.posts = {
      ids,
      all,
      isLoaded: true
    }
  }
}

const store = new Store(initState())

export const useStore = () => store