import { Cell, isMine } from "./gen";

type CellViewProps = {
    matrix: Cell[][];
    v_index: number;
    h_index: number;
    click?: Function;
    flagClick?: Function;
};

function CellView(props: CellViewProps) {

    const { matrix, v_index, h_index, click, flagClick } = props;

    function renderCellContent(cell: Cell) {
        const { val, isShown, isFlag } = cell;
        if (isFlag) {
            return renderFlag();
        }
        if (isShown) {
            if (isMine(cell)) {
                return renderMine();
            }
            return isShown ? val : "";
        }
        return null;
    }

    function renderFlag() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="red"
                className="w-4 h-4"
            >
                <path d="M2.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.5 0v-2.624l.33-.083A6.044 6.044 0 0 1 8 11c1.29.645 2.77.807 4.17.457l1.48-.37a.462.462 0 0 0 .35-.448V3.56a.438.438 0 0 0-.544-.425l-1.287.322C10.77 3.808 9.291 3.646 8 3a6.045 6.045 0 0 0-4.17-.457l-.34.085A.75.75 0 0 0 2.75 2Z" />
            </svg>
        );
    }

    function renderMine() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
            </svg>
        );
    }

    function background(v_index: number, h_index: number): string {
        const cell = matrix[v_index][h_index];
        const { isShown } = cell;
        // if (point.x === h_index && point.y === v_index && isMine(cell)) {
        //     return "bg-red-400";
        // }
        return isShown ? "bg-white-100" : "bg-gray-100";
    }

    return (
        <div
            key={`x_${h_index}`}
            className={`flex justify-center items-center w-9 h-9 border border-gray-50 ${background(
                v_index,
                h_index
            )} hover:bg-gray-300`}
            onClick={() => click && click(h_index, v_index)}
            onContextMenu={(e) => {
                e.preventDefault();
                flagClick && flagClick(v_index, h_index);
            }}
        >
            {renderCellContent(matrix[v_index][h_index])}
        </div>
    );
}

export default CellView;
