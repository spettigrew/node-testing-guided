const db = require("../data/config")
const hobbitsModel = require("./hobbits-model")

// this function will run before each function. Will re-run seeds every test.
beforeEach(async () => {
    await db.seed.run()
})

describe("hobbits model", () => {
    test("list", async () => {
        const res = await hobbitsModel.list()
        expect(res.length).toBeGreaterThan(0)
        // .toHaveLength(4)
    })

    test("findById", async () => {
        const res = await hobbitsModel.findById(1)
        expect(res.name).toBe("sam")
    })

    test("insert", async () => {
        await hobbitsModel.insert({ name: "bilbo" })
        const hobbits = await db("hobbits").select()
        expect(hobbits).toHaveLength(5)
    }) 

    test("update", async () => {
        await hobbitsModel.update(1, { name: "bilbo" })
        const hobbit = await hobbitsModel.findById(1)
        expect(hobbit.name).toBe("bilbo")
        // RegEx = regular expression(/bilbo/i) upper/lowercase will be included.
    })

    test("remove", async () => {
        await hobbitsModel.remove(1)
        const hobbits = await hobbitsModel.list()
        expect(hobbits).toHaveLength(3) 
    })
})
