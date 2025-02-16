import { useState } from "react";
import { ISeat } from "../../features/crud-pages/seats/store/types";
import './index.css'

const seatsSorter = (seats: ISeat[]) => {
    const seatsGroupedByRow = seats.reduce<Record<string, ISeat[]>>((acc, seat) => {
        if (!acc[seat.row])
            acc[seat.row] = [];

        acc[seat.row].push(seat);

        return acc;
    }, {});

    const sortedSeats = Object.entries(seatsGroupedByRow).map(([key, value]) => {
        return {
            row: key,
            seats: value.sort((a, b) => parseInt(a.number) - parseInt(b.number))
        };
    }).sort((a, b) => b.row.localeCompare(a.row));

    return sortedSeats as IFormat[];
}

interface IFormat {
    row: string
    seats: ISeat[]
}

interface IProps {
    seats: ISeat[]
    screened: boolean
    disabled?: boolean
    title?: (seat: ISeat) => string
    onSeatClick?: (seat: ISeat) => void
    colorChanger?: IChanger
    beforeColorChange?: {
        condition: (seat: ISeat) => boolean
        true: string
    }
}

interface IChanger {
    condition: (seat: ISeat) => boolean
    false: string
    true: string
}

const gapSize = 8;

const getContrastYIQ = (color: string) => {
    const hex = color.startsWith('#') ? color.slice(1) : color;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? 'black' : 'white';
}

const changer = (seat: ISeat, colorChanger?: IChanger, beforeColorChange?: { condition: (seat: ISeat) => boolean, true: string }) => {
    const result: { backgroundColor?: string, color?: string } = {};

    if (beforeColorChange && beforeColorChange.condition(seat)) {
        result.backgroundColor = beforeColorChange.true;
        result.color = getContrastYIQ(beforeColorChange.true);
    }
    else if (colorChanger) {
        result.backgroundColor = colorChanger.condition(seat) ? colorChanger.true : colorChanger.false;
        result.color = getContrastYIQ(colorChanger.condition(seat) ? colorChanger.true : colorChanger.false);
    }

    return result;
}

const SeatsVisualization = ({ seats: notFormattedSeats, screened, disabled, title, onSeatClick, colorChanger, beforeColorChange }: IProps) => {
    const [seats] = useState<IFormat[]>(seatsSorter(notFormattedSeats));
    const [minWidth] = useState((Math.max(...seats.map(row => row.seats.length)) * (40 + gapSize)) - gapSize);

    return (
        <div className="d-flex flex-column" style={{ minWidth: `${minWidth}px` }}>
            {
                seats.map(row => (
                    <div key={row.row} className="mb-3">
                        <div className="d-flex justify-content-center gap-2">
                            {
                                row.seats.map(seat =>
                                    <div
                                        key={seat.id}
                                        title={title && title(seat)}
                                        style={{
                                            cursor: disabled ? 'not-allowed' : 'pointer',
                                            ...changer(seat, colorChanger, beforeColorChange)
                                        }}
                                        onClick={disabled ? undefined : () => onSeatClick && onSeatClick(seat)}
                                        className='seat'
                                    >
                                        {seat.number}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))
            }
            {
                screened &&
                <div className="d-flex justify-content-center">
                    <hr className="border border-dark border-3 rounded" style={{ width: `${minWidth}px` }} />
                </div>
            }
        </div>

    );
}

export default SeatsVisualization;