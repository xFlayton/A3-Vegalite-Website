async function fetchData() {
  const dataFileWide = await d3.csv("../data/videogames_wide.csv", d3.autoType);
  const dataFileLong = await d3.csv("../data/videogames_long.csv", d3.autoType);
  return { dataFileWide, dataFileLong };
}

fetchData().then(async ({ dataFileWide, dataFileLong }) => {

  const vlSpec1 = vl
    .markBar()
    .data(dataFileWide)
    .encode(
      vl.y().fieldN("Genre").sort("-x").title("Genre"),
      vl.x().fieldQ("Global_Sales").aggregate("sum").title("Sales (Millions)"),
      vl.color().fieldN("Platform").title("Platform"),
      vl.tooltip([
        { field: "Genre", type: "nominal" },
        { field: "Platform", type: "nominal" },
        { field: "Global_Sales", type: "quantitative", aggregate: "sum", title: "Sales (M)" }
      ])
    )
    .width("container")
    .height(400)
    .toSpec();

    const vlSpec2 = vl
    .markArea()
    .data(dataFileWide)
    .encode(
      vl.x().fieldQ("Year").title("Year"),
      vl.y().fieldQ("Global_Sales").aggregate("sum").stack("zero").title("Global Sales (Millions)"),
      vl.color().fieldN("Genre").title("Genre"),
      vl.tooltip([
        { field: "Genre", type: "nominal" },
        { field: "Year", type: "quantitative" },
        { aggregate: "sum", field: "Global_Sales", type: "quantitative", title: "Global Sales (Sum)" }
      ])
    )
    .width("container")
    .height(400)
    .toSpec();

    const vlSpec3 = vl
    .markBar()
    .data(dataFileLong)
    .encode(
        vl.x().fieldN("platform").title("Platform"),
        vl.y().fieldQ("sales_amount").aggregate("sum").title("Sales (Millions)"),
        vl.color().fieldN("sales_region").title("Region")
    )
    .width("container")
    .height(400)
    .toSpec()

    const vlSpec4 = vl 
    .markBar()
    .data(dataFileWide)
    .encode(
        vl.x().fieldN("Genre"),
        vl.y().fieldQ("Global_Sales").aggregate("sum").title("Sales (Millions)"),
        vl.color().fieldN("Platform").title("Platform")
    )
    .width("container")
    .height(400)
    .toSpec()

    const vlSpec5 = vl.markBar()
    .data(dataFileLong)
    .encode(
    vl.y().fieldN("platform").title("Platform"),
    vl.x().fieldQ("sales_amount").aggregate("sum").stack("normalize").title("% of Total Sales"),
    vl.color().fieldN("sales_region").title("Region"),
    vl.tooltip([
      { field: "platform", type: "nominal", title: "Platform" },
      { field: "sales_region", type: "nominal", title: "Region" },
      { field: "sales_amount", type: "quantitative", aggregate: "sum", title: "Sales (Millions)" }
    ])
  )
  .width("container")
  .height(400)
  .toSpec()

  const vlSpec6 =vl
  .markLine()
  .data(dataFileWide)
  .encode(
    vl.x().fieldQ("Year"),
    vl.y().fieldQ("Global_Sales").aggregate("sum").stack("zero").title("Global Sales (Millions)"),
    vl.color().fieldN("Platform")
)
.width("container")
.height(400)
.toSpec()

const vlSpec7 = vl
.markLine({ strokeWidth: 2})
.data(dataFileWide)
.encode(
    vl.x().fieldQ("Year").title("Year"),
    vl.y()
      .fieldQ("Global_Sales")
      .aggregate("sum")
      .title("Global Sales (Millions)"),
    vl.color().fieldN("Platform").title("Platform"),
    vl.tooltip([
      { field: "Year", type: "quantitative" },
      { field: "Platform", type: "nominal" },
      { field: "Global_Sales", type: "quantitative", aggregate: "sum", title: "Sales (Millions)" }
    ])
  )
  .width("container")
  .height(400)
  .toSpec()

    render("#view1", vlSpec1);
    render("#view2", vlSpec2);
    render("#view3", vlSpec3);
    render("#view4", vlSpec4);
    render("#view5", vlSpec5);
    render("#view6", vlSpec6);
    render("#view7", vlSpec7);


});


async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
