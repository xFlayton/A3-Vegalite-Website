function platformFamily(p) {
  if (p == null) return "Other";
  p = String(p).trim();

  // PlayStation
  if (p.startsWith("PS") || p === "PSP" || p === "PSV") return "PlayStation";

  // Xbox
  if (p.startsWith("XB") || p === "X360" || p === "XONE") return "Xbox";

  // Nintendo
  if (["NES","SNES","N64","GC","Wii","WiiU","GB","GBA","DS","3DS","NS"].includes(p))
    return "Nintendo";

  // PC
  if (p === "PC") return "PC";

  // Sega (optional)
  if (["GEN","SCD","SAT","DC","GG"].includes(p)) return "Sega";

  return "Other";
}

// 2) Load data
async function fetchData() {
  const dataFileLong = await d3.csv("../data/videogames_long.csv", d3.autoType);
  const dataFileWide = await d3.csv("../data/videogames_wide.csv", d3.autoType);
  return { dataFileLong, dataFileWide };
}

fetchData().then(({ dataFileLong, dataFileWide }) => {
  // 3) Add PlatformFamily onto each row
  const dataWithFamilyW = dataFileWide.map(d => ({
    ...d,
    PlatformFamily: platformFamily(d.platform ?? d.Platform) // handles either column name
  }));

  // 4) Build Vega-Lite chart
  const vlSpec = vl
    .markBar()
    .data(dataWithFamilyW)
    .encode(
      vl.y().fieldN("Genre").sort("-x").title("Genre"),
      vl.x().fieldQ("Global_Sales").aggregate("sum").title("Sales (Millions)"),
      vl.color().fieldN("PlatformFamily").title("Platform Family"),
      vl.tooltip([
        { field: "Genre", type: "nominal" },
        { field: "PlatformFamily", type: "nominal" },
        { field: "Global_Sales", type: "quantitative", aggregate: "sum", title: "Sales (M)" }
      ])
    )
    .width("container")
    .height(400)
    .toSpec();

    vegaEmbed("#view", vlSpec, { 
        actions: false,
        tooltip: true
    });

});
