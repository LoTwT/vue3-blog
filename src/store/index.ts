import { reactive } from "vue"
import { todayPost, thisWeekPost, thisMonthPost } from "@/mock"
import { MockPost } from "@/types"

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
}

const store = new Store(initState())

export const useStore = () => store