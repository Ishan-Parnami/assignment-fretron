const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const x = d3.scaleLinear().domain([0, 5]).range([margin.left, width - margin.right]);
const y = d3.scaleLinear().domain([0, 5]).range([height - margin.bottom, margin.top]);

const flights = [
    { path: [[1, 1], [2, 2], [3, 3]], color: "skyblue", label: "Flight 1" },
    { path: [[1, 1], [3, 4], [2, 3]], color: "gold", label: "Flight 2" },
    { path: [[1, 1], [4, 2], [3, 4]], color: "salmon", label: "Flight 3" }
];

const line = d3.line()
    .x(d => x(d[0]))
    .y(d => y(d[1]));

svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(5));

svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5));

flights.forEach(flight => {
    svg.append("path")
        .datum(flight.path)
        .attr("fill", "none")
        .attr("stroke", flight.color)
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.selectAll(`.circle-${flight.label}`)
        .data(flight.path)
        .enter().append("circle")
        .attr("class", `circle circle-${flight.label}`)
        .attr("cx", d => x(d[0]))
        .attr("cy", d => y(d[1]))
        .attr("r", 10)
        .attr("fill", flight.color);
});
