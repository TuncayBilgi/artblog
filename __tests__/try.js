function mock(a) {
    return a
}

test(
    'mocktest',() =>{
        expect(mock("a")).toBe("a")
    }
)