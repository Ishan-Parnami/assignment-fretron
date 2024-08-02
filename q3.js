const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function turnLeft(direction) {
    return (direction + 1) % 4;
}

function moveInDirection(position, direction) {
    let [x, y] = position;
    switch (direction) {
        case 0: return [x, y + 1];
        case 1: return [x + 1, y];
        case 2: return [x, y - 1];
        case 3: return [x - 1, y];
    }
}

function isValidMove(position, boardSize, soldiers) {
    let [x, y] = position;
    return x >= 0 && x < boardSize && y >= 0 && y < boardSize && !soldiers.has(`${x},${y}`);
}

function findPaths(start, soldiers, boardSize) {
    let paths = [];
    let stack = [[start, [], 0, new Set(soldiers)]];

    while (stack.length > 0) {
        let [position, path, direction, remainingSoldiers] = stack.pop();
        if (remainingSoldiers.size === 0 && position.toString() === start.toString()) {
            paths.push([...path, `Arrive (${start[0] + 1},${start[1] + 1})`]);
            continue;
        }

        let nextPosition = moveInDirection(position, direction);
        let posStr = `${nextPosition[0]},${nextPosition[1]}`;

        if (remainingSoldiers.has(posStr)) {
            let newRemaining = new Set(remainingSoldiers);
            newRemaining.delete(posStr);
            let newPath = [...path, `Kill (${nextPosition[0] + 1},${nextPosition[1] + 1}). Turn Left`];
            stack.push([nextPosition, newPath, turnLeft(direction), newRemaining]);
        } else if (isValidMove(nextPosition, boardSize, soldiers)) {
            stack.push([nextPosition, [...path, `Jump (${nextPosition[0] + 1},${nextPosition[1] + 1})`], direction, remainingSoldiers]);
        }
    }
    return paths;
}

async function main() {
    const boardSize = 10;
    let soldiers = new Set();

    const numSoldiers = await new Promise(resolve => {
        rl.question('Enter the number of soldiers: ', answer => {
            resolve(parseInt(answer));
        });
    });

    for (let i = 0; i < numSoldiers; i++) {
        const coords = await new Promise(resolve => {
            rl.question(`Enter coordinates for soldier ${i + 1} (e.g., "1,1"): `, answer => {
                resolve(answer.split(',').map(Number));
            });
        });
        soldiers.add(`${coords[0] - 1},${coords[1] - 1}`);
    }

    const castleCoords = await new Promise(resolve => {
        rl.question('Enter the coordinates for your "special" castle (e.g., "1,2"): ', answer => {
            resolve(answer.split(',').map(Number));
        });
    });
    const start = [castleCoords[0] - 1, castleCoords[1] - 1];

    const paths = findPaths(start, soldiers, boardSize);

    console.log(`\nThanks. There are ${paths.length} unique paths for your 'special_castle'\n`);

    paths.forEach((path, i) => {
        console.log(`Path ${i + 1}: \n=======\nStart (${start[0] + 1},${start[1] + 1})`);
        path.forEach(step => console.log(step));
        console.log();
    });

    rl.close();
}

main();
