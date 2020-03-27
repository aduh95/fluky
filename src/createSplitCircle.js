const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

function polarToCartesian(centerX, centerY, radius, angleInRadians) {
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = Number((endAngle - startAngle) % 360 > 180);

  var d = [
    "M",
    start.x,
    start.y,

    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

export default function createSplitCircle(diameter, colors) {
  const svg = document.createElementNS(SVG_NAMESPACE, "svg");
  svg.setAttribute("height", diameter);
  svg.setAttribute("width", diameter);

  const angle = (2 * Math.PI) / colors.length;
  svg.append(
    ...colors.map((color, i) => {
      const path = document.createElementNS(SVG_NAMESPACE, "path");
      path.setAttribute(
        "d",
        describeArc(
          diameter / 2,
          diameter / 2,
          diameter / 4,
          angle * i,
          angle * (i + 1)
        )
      );
      path.setAttribute("stroke-width", diameter / 2);
      path.setAttribute("stroke", color);
      path.setAttribute("fill", "none");
      return path;
    })
  );
  return svg;
}

if (import.meta.main) {
  let svgElement = document.body.appendChild(
    document.createComment("SVG here")
  );
  let i = 0;
  function update() {
    svgElement.replaceWith(
      (svgElement = createSplitCircle(
        100,
        Array.from({ length: ++i }, generateRandomColor)
      ))
    );
  }
  setInterval(update, 30);
}
