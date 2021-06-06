import { reactive } from "vue"
// import { todayPost, thisWeekPost, thisMonthPost } from "@/mock"
import { Post, User } from "@/types"
import axios from "axios"

interface PostState {
  ids: string[],
  all: Record<string, Post>,
  isLoaded: boolean,
}

interface LoginUserState {
  ids: string[],
  all: Record<string, User>,
  isLoaded: boolean,
  currentUserId?: string
}


interface State {
  posts: PostState,
  loginUsers: LoginUserState
}

const initPostState = (): PostState => ({
  ids: [],
  all: {},
  isLoaded: false
})

const initLoginUserState = (): LoginUserState => ({
  ids: [],
  all: {},
  isLoaded: false,
  currentUserId: undefined
})

const initState = (): State => ({ posts: initPostState(), loginUsers: initLoginUserState() })

class Store {
  protected state: State

  constructor(initialState: State) {
    this.state = reactive(initialState)
  }

  public getState(): State {
    return this.state
  }

  async fetchPosts(): Promise<void> {
    const res = await axios.get<Post[]>("/mockposts")

    for (const post of res.data) {
      if (!this.state.posts.ids.includes(post.id.toString())) {
        this.state.posts.ids.push(post.id.toString())
      }
      this.state.posts.all[post.id] = post
    }

    this.state.posts.isLoaded = true
  }

  async createPost(post: Post): Promise<void> {
    const res = await axios.post<Post>("/mockposts", post)
    this.state.posts.all[res.data.id] = res.data
    this.state.posts.ids.push(res.data.id.toString())
  }

  async updatePost(post: Post): Promise<void> {
    const res = await axios.put<Post>("/mockposts", post)
    this.state.posts.all[res.data.id] = res.data
  }

  async createUser(user: User): Promise<void> {
    // 创建用户
    const res = await axios.post<User>("/mockusers", user)
    this.state.loginUsers.all[res.data.id] = res.data
    this.state.loginUsers.ids.push(res.data.id.toString())
    this.state.loginUsers.currentUserId = res.data.id.toString()
  }
}

const store = new Store(initState())

export const useStore = () => store