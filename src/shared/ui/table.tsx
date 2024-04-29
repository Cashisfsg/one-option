import { cn } from "../lib";

type TableProps<H extends (string | number)[], D extends { id: "string" }[]> = {
    headers: H;
    data: D;
    renderCaption?: React.ReactNode;
    renderColumns?: React.ReactNode;
    renderHeader?: (headers: H) => React.ReactElement;
    renderData?: (data: D) => React.ReactElement;
};

export const Table = <
    H extends (string | number)[],
    D extends { id: "string" }[]
>({
    headers,
    data,
    renderCaption: caption,
    renderColumns,
    renderHeader = headers => (
        <thead>
            <Row>
                {headers?.map(header => (
                    <TableHeaderCell key={header}>{header}</TableHeaderCell>
                ))}
            </Row>
        </thead>
    ),
    renderData = data => (
        <tbody className="[&>*:nth-child(odd)]:bg-quaternary">
            {data?.map(row => (
                <Row key={row.id}>
                    {Object.values(row)?.map(cell => <Cell>{cell}</Cell>)}
                </Row>
            ))}
        </tbody>
    ),
    className,
    ...props
}: TableProps<H, D> & React.ComponentProps<"table">) => {
    return (
        <table
            {...props}
            className={cn(
                "w-full overflow-hidden rounded-2xl bg-secondary",
                className
            )}
        >
            {caption ? <Caption>{caption}</Caption> : null}
            {renderColumns}
            {renderHeader(headers)}
            {renderData(data)}
        </table>
    );
};

interface CaptionProps extends React.ComponentProps<"caption"> {}

export const Caption: React.FC<CaptionProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <caption
            {...props}
            className={cn(
                "text-lg-xl-xs-lg border-b-4 border-double border-quaternary bg-inherit px-4 py-3",
                className
            )}
        >
            {children}
        </caption>
    );
};

interface RowProps extends React.ComponentProps<"tr"> {}

export const Row: React.FC<RowProps> = ({ className, children, ...props }) => {
    return (
        <tr
            {...props}
            className={cn("", className)}
        >
            {children}
        </tr>
    );
};

interface TableHeaderCellProps extends React.ComponentProps<"th"> {}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <th
            {...props}
            className={cn("text-lg-xl-xs-lg px-4 py-2 uppercase", className)}
        >
            {children}
        </th>
    );
};

interface TableCellProps extends React.ComponentProps<"td"> {}

export const Cell: React.FC<TableCellProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <td
            {...props}
            className={cn(
                "text-sm-base-xs-lg px-3 py-2 text-center font-secondary",
                className
            )}
        >
            {children}
        </td>
    );
};
