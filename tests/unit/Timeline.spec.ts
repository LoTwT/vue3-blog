import { mount } from "@vue/test-utils"
// import { nextTick } from "vue"
import Timeline from "@/components/Timeline.vue"
import Home from "@/views/Home.vue"
import flushPromises from "flush-promises"
import * as MockData from "@/mock"

jest.mock("axios", () => ({
    get: (url: string) => ({
        data: [MockData.todayPost, MockData.thisWeekPost, MockData.thisMonthPost]
    })
}))

describe("Timeline.vue", () => {
    // it.only("解决 Timeline 异步问题", () => {
    //     mount({
    //         template: `<Suspense><Timeline /></Suspense>`
    //     })
    // })

    it("测试加载动画", () => {
        const wrapper = mount(Home)
        expect(wrapper.find("[data-test='progress']").exists()).toBe(true)
    })

    it("测试是否有三个 a 标签", async () => {
        const wrapper = mount(Home)
        await flushPromises()
        expect(wrapper.findAll("[data-test='period']")).toHaveLength(3)
    })

    it("测试 a 标签事件功能", async () => {
        const wrapper = mount(Home)
        await flushPromises()
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

    it("测试数据加载", async () => {
        const wrapper = mount(Home)
        await flushPromises()
        expect(wrapper.findAll("[data-test='dataPost']")).toHaveLength(1)

        const thisWeek = wrapper.findAll("[data-test='period']")[1]
        await thisWeek.trigger("click")
        expect(wrapper.findAll("[data-test='dataPost']")).toHaveLength(2)

        const thisMonth = wrapper.findAll("[data-test='period']")[2]
        await thisMonth.trigger("click")
        expect(wrapper.findAll("[data-test='dataPost']")).toHaveLength(3)

    })
})