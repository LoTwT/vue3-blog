import { mount } from "@vue/test-utils"
import PostWriter from "@/components/PostWriter.vue"
import { basePost } from "@/mock"

describe("PostWriter", () => {
  it("测试 PostWriter", () => {
    const wrapper = mount(PostWriter, {
      props: {
        post: { ...basePost }
      }
    })
    wrapper.find("[data-test='post-title']").setValue("Test title that modified by jest")

    wrapper.find<HTMLDivElement>("[data-test='markdown']").element.innerText = "## Test markdown"
    wrapper.find<HTMLDivElement>("[data-test='markdown']").trigger("input")

    wrapper.find("[data-test='save-post']").trigger("click")
    console.log(wrapper.emitted().updatePost)
  })
})