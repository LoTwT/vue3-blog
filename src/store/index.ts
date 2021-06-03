import { reactive } from "vue"
// import { todayPost, thisWeekPost, thisMonthPost } from "@/mock"
import { MockPost } from "@/types"
import axios from "axios"

interface PostState {
  ids: string[],
  all: Record<string, MockPost>,
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
    const res = await axios.get<MockPost[]>("/mockposts")
    const ids: string[] = []
    const all: Record<string, MockPost> = {}

    for (const mockPost of res.data) {
      ids.push(mockPost.id.toString())
      all[mockPost.id] = mockPost
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