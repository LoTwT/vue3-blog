import { mount } from "@vue/test-utils"
// import { nextTick } from "vue"
import Timeline from "@/components/Timeline.vue"

describe("Timeline.vue", () => {
    it("测试是否有三个 a 标签", () => {
        const wrapper = mount(Timeline)
        expect(wrapper.findAll("[data-test='period']")).toHaveLength(3)
    })

    it("测试 a 标签事件功能", async () => {
        const wrapper = mount(Timeline)
        const aList = wrapper.findAll("[data-test='period']")

        const today = aList[0]
        expect(today.classes()).toContain("is-active")

        const thisWeek = aList[1]
        // 等待 dom 更新完毕
        await thisWeek.trigger("click")
        // await nextTick()
        expect(today.classes()).not.toContain("is-active")
        expect(thisWeek.classes()).toContain("is-active")

        const thisMonth = aList[2]
        // 等待 dom 更新完毕
        await thisMonth.trigger("click")
        // await nextTick()
        expect(thisWeek.classes()).not.toContain("is-active")
        expect(thisMonth.classes()).toContain("is-active")
    })
})