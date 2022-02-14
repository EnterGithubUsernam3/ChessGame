// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
// }
function getRandomInt() {
    let x = Math.floor(Math.random() * (3 - 1 + 1) + 1); //The maximum is inclusive and the minimum is inclusive
    if (x == 1) {
        return [1,"lost"]
    } else if (x == 2) {
        return [2,"tie"]
    }
    else {
        return [3,"won"]
    }
}

function getOpponent(array) {
    return (array[Math.floor(Math.random() * array.length)]);
}
class Player {
    constructor(id) {
        this.id = id
    }
    array = []
}


class Arena {
    constructor(players) {
        this.players = players
        this.combination = []
    }
    start() {
        this.players.forEach((player, index) => {
            while (player.array.length < 3) {
                let opponent = getOpponent(this.players)
                if (opponent != player){
                    let test = player.array.map( name => name.Opponent.id)
                    if (!test.includes(opponent.id)){
                        player.array.push({ Opponent: opponent, result: getRandomInt() })
                        console.log(test);
                    }
                }
                // console.log(player.array);
            }
            this.combination.push(player.array)
        })
    };
}
let x1 = new Player(1)
let x2 = new Player(2)
let x3 = new Player(3)
let x4 = new Player(4)
let test = new Arena([x1, x2, x3, x4])
test.start()
test.combination.forEach(element => {
    console.log(element);
})
x = [{o:x1},{o:x2}]
p = [x1]
if (!p.includes(x2)){
    console.log(1);
};
console.log(x.includes({o:x1}))
// async function create(array) {
//     // console.log(array[0][1]);
//     // console.log(array[0][1].Opponent.id);
//     let o = []
//     // console.log(array);
//     for (let match of array) {
//         for (let i = 0; i < 3; i++) {
//             let v = { Player_Id_1: match[0].owner }
//             // console.log(v);
//             v.Player_Id_2 = match[i + 1].Opponent.id
//             v.Result = match[i + 1].result[0]
//             v.Points = match[i + 1].result[1]
//             // console.log(v);
//             o.push(v)
//         }
//     }
//     console.log(o);
// }