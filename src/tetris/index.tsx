import Board from "../components/board";

function Tetris() {

    return (<div className="flex flex-col">
        <div>header</div>
        <Board grids={[]} />
    </div>);
}

export default Tetris;