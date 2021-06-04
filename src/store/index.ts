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
    const res = await axios.get<Post[]>("/mockposts")

    for (const post of res.data) {
      if (!this.state.posts.ids.includes(post.id.toString())) {
        this.state.posts.ids.push(post.id.toString())
      }
      this.state.posts.all[post.id] = post
    }

    this.state.posts.isLoaded = true
  }

  async createPost(post: Post) {
    const res = await axios.post<Post>("/mockposts", post)
    this.state.posts.all[res.data.id] = res.data
    this.state.posts.ids.push(res.data.id.toString())
  }
}

const store = new Store(initState())

export const useStore = () => store