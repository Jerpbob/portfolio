import { fetchJSON, renderProjects, countProjects } from '../global.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
const projectTitle = document.querySelector('.projects-title');
renderProjects(projects, projectsContainer, 'h2');
countProjects(projects, projectTitle);
let arcGenerator = d3
    .arc()
    .innerRadius(0)
    .outerRadius(50);

let query = '';
let searchInput = document.querySelector('.searchBar');
// searchInput.addEventListener('change', (event) => {
//     // update query value
//     query = event.target.value;
//     // filter projects
//     let filteredProjects = projects.filter((project) => {
//         let values = Object.values(project).join('\n').toLowerCase();
//         return values.includes(query.toLowerCase());
//     });
//     // render filtered projects
//     renderProjects(filteredProjects, projectsContainer, 'h2');
//     let rolledData = d3.rollups(
//         filteredProjects,
//         (v) => v.length,
//         (d) => d.year,
//     );

//     let data = rolledData.map(([year, count]) => {
//         return { value: count, label: year };
//     });


//     let sliceGenerator = d3.pie().value((d) => d.value);
//     let arcData = sliceGenerator(data);
//     let arcs = arcData.map((d) => arcGenerator(d));
//     let colors = d3.scaleOrdinal(d3.schemeTableau10);


//     arcs.forEach((arc, index) => {
//         d3.select('svg')
//             .append('path')
//             .attr('d', arc)
//             .attr('fill', `${colors(index)}`);
//     })

//     let legend = d3.select('.legend');
//     data.forEach((d, idx) => {
//         legend.append('li')
//             .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
//             .attr('class', 'legend-item')
//             .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
//     })
// });


function renderPieChart(projectsGiven) {
    // re-calculate rolled data
    let newRolledData = d3.rollups(
        projectsGiven,
        (v) => v.length,
        (d) => d.year,
    );
    // re-calculate data
    let newData = newRolledData.map(([year, count]) => {
        return { value: count, label: year }; // TODO
    });
    // re-calculate slice generator, arc data, arc, etc.
    let newSliceGenerator = d3.pie().value((d) => d.value);
    let newArcData = newSliceGenerator(newData);
    let newArcs = newArcData.map((d) => arcGenerator(d));

    let newSVG = d3.select('svg');
    newSVG.selectAll('path').remove();

    let newLegend = d3.select('.legend');
    newLegend.selectAll('.legend-item').remove();

    let colors = d3.scaleOrdinal(d3.schemeTableau10);

    newArcs.forEach((arc, index) => {
        d3.select('svg')
            .append('path')
            .attr('d', arc)
            .attr('fill', `${colors(index)}`);
    })

    newData.forEach((d, idx) => {
        newLegend.append('li')
            .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
            .attr('class', 'legend-item')
            .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
    })
}

// Call this function on page load
renderPieChart(projects);

searchInput.addEventListener('input', (event) => {
    query = event.target.value;
    // filter projects
    let filteredProjects = projects.filter((project) => {
        let values = Object.values(project).join('\n').toLowerCase();
        return values.includes(query.toLowerCase());
    });
    // re-render legends and pie chart when event triggers
    renderProjects(filteredProjects, projectsContainer, 'h2');
    renderPieChart(filteredProjects);
});

// let selectedIndex = -1;
// let svg = d3.select('svg');
// svg.selectAll('path').remove();
// arcs.forEach((arc, i) => {
//     svg
//         .append('path')
//         .attr('d', arc)
//         .attr('fill', colors(i))
//         .on('click', () => {
//             selectedIndex = selectedIndex === i ? -1 : i;

//             svg
//                 .selectAll('path')
//                 .attr('class', (_, idx) => (
//                 // TODO: filter idx to find correct pie slice and apply CSS from above
//               ));
//         });
// });
