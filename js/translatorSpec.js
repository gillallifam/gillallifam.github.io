describe("Translator", function () {

  it("Generate an id", function () {
    expect(genID.next().value).toEqual("genID1");
  });
  it("Generate one more id", function () {
    expect(genID.next().value).toEqual("genID2");
  });

  it("Have one or more langs", function () {
    expect(Object.keys(allLangs).length).toBeGreaterThanOrEqual(1);
  });

  it("Redirect wrong language", function () {
    expect(buildLanguage("xyz").langName).toBe("EN");
  });

  it("Test all languages", function () {
    expect(testLangs(allLangs)).toBe(true);
  });

  it("Acquire targets", function () {
    expect(Object.keys(getTargets()).length).toBeGreaterThanOrEqual(1);
  });

  it("Translate targets", function () {
    translateTargets(buildLanguage("PT"), getTargets())
    let tt = document.getElementById("testTarget")
    expect(tt.innerText).toBe("Casa");
  });

});

