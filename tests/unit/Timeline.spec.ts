import { mount } from "@vue/test-utils"
import Timeline from "@/components/Timeline.vue"

describe("Timeline.vue", () => {
    it("测试是否有三个 a 标签", () => {
        const wrapper = mount(Timeline)
        expect(wrapper.findAll("a")).toHaveLength(3)
    })
})