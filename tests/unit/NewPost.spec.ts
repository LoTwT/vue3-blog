import { mount } from "@vue/test-utils"
import NewPost from "@/views/NewPost.vue"
import { useStore } from "@/store"
import { Post } from "@/types"

// 模拟路由
const mockRoutes: string[] = []
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: (url: string) => {
      mockRoutes.push(url)
    }
  })
}))

// 模拟数据

jest.mock("axios", () => ({
  post: (url: string, payload: Post) => ({ data: payload })
}))

describe("NewPost", () => {
  it("测试 NewPost", async () => {
    const store = useStore()
    const wrapper = mount(NewPost, {
      global: {
        provide: { store }
      }
    })

    expect(store.getState().posts.ids).toHaveLength(0)

    await wrapper.find("[data-test='save-post']").trigger("click")
    await wrapper.vm.$nextTick()

    expect(store.getState().posts.ids).toHaveLength(1)
    expect(mockRoutes).toEqual(["/"])
  })
})