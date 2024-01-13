import { GCell, Point } from "../model/model";


export const DEFAULT_H = 20;
export const DEFAULT_W = 20;


interface BoardProps {
    grids: GCell[][];
    onItemClick?: (point: Point) => void;
}

function Board(props: BoardProps) {
    const { grids, onItemClick } = props;

    function background(cell: GCell): string {
        const { visible } = cell;
        return visible ? `bg-gray-400` : `bg-slate-100`;
    }

    return (
        <div className="flex w-auto h-auto justify-center align-middle flex-col ">
            {grids.map((cells: GCell[], h_index: number) => {
                return (
                    <div key={`item_${h_index}`} className="flex flex-row justify-center items-center">
                        {
                            cells.map((cell: GCell, w_index: number) => {
                                return (
                                    <div
                                        key={`child_${w_index}`}
                                        className={`flex flex-row justify-center items-center w-7 h-7 border border-gray-50 ${background(cell)}`}
                                        onClick={() => {
                                            onItemClick &&
                                                onItemClick({
                                                    x: w_index,
                                                    y: h_index,
                                                });
                                        }}
                                    >
                                    </div>
                                );
                            })
                        }
                    </div>
                );
            })}
        </div>
    );
}

export default Board;
