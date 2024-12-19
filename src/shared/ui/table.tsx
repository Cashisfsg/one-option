import React from "react";
import { cnBase } from "tailwind-variants";

// type UniqueKey<T extends string | number | symbol = "id"> = T;

// type Data<T extends string | number | symbol> = Record<T, string | number>;

// type Data = Record<string, number | string>;

type DataType<
    T extends Record<string, unknown> = Record<string, string | number>
> = T;

type Header<T extends (string | number)[] = (string | number)[]> = T;

type UniqueKey<D extends DataType> = keyof D;

// type UniqueKey<D extends DataType = DataType, T extends keyof D = keyof D> = T;

interface TableComponents {
    Caption?: () => React.ReactElement<
        React.ComponentPropsWithoutRef<"caption">,
        "caption"
    >;
    Row?: (
        props: React.ComponentPropsWithoutRef<"tr">
    ) => React.ReactElement<React.ComponentPropsWithoutRef<"tr">, "tr">;
    // TableRow?: JSX.IntrinsicElements["tr"];
    // TableRow?: React.ReactElement<HTMLTableCellElement>;
    Cell?: (
        props: React.ComponentPropsWithoutRef<"td">
    ) => React.ReactElement<React.ComponentPropsWithoutRef<"td">, "td">;
}

const TableContext = React.createContext<{
    uniqueKey: UniqueKey<DataType>;
    components?: TableComponents;
} | null>(null);

const useTableContext = () => {
    const context = React.useContext(TableContext);

    if (!context) {
        throw new Error(
            "Component must be rendered as child of Table component"
        );
    }

    return context;
};

type TableProps<H, D extends DataType> = {
    uniqueKey: UniqueKey<D>;
    headers: H;
    data: D[];
    renderCaption?: (
        props: React.ComponentPropsWithoutRef<"caption">
    ) => React.ComponentPropsWithoutRef<"caption">;
    renderColumns?: React.ReactNode;
    renderHeader?: (headers: Header) => React.ReactElement;
    renderData?: (
        data: D[],
        rowElement?: React.FC<TableRowProps>
    ) => React.ReactElement;
    components?: TableComponents;
} & React.ComponentPropsWithoutRef<"table">;

export const Table = <H extends Header, D extends DataType>({
    uniqueKey,
    headers,
    data,
    components,
    renderColumns: columns,
    renderHeader: renderHeaders,
    renderData,
    className,
    ...props
}: TableProps<H, D>) => {
    const context = React.useMemo(
        () => ({ uniqueKey, components }),
        [uniqueKey, components]
    );

    return (
        <TableContext.Provider value={context}>
            <table
                {...props}
                className={cnBase(
                    "w-full overflow-hidden rounded-2xl bg-secondary",
                    className
                )}
            >
                <Caption />
                {columns}
                <TableHead
                    headers={headers}
                    renderHeaders={renderHeaders}
                />
                <TableBody
                    data={data}
                    renderData={renderData}
                />
            </table>
        </TableContext.Provider>
    );
};

interface TableCaptionProps extends React.ComponentProps<"caption"> {}

export const Caption: React.FC<TableCaptionProps> = () => {
    const { components } = useTableContext();

    if (components === undefined || components.Caption === undefined) {
        return null;
    }

    const caption = components?.Caption();
    const props = caption.props;
    const children = props?.children;

    return (
        <caption
            className={cnBase(
                "border-b-4 border-double border-quaternary bg-inherit px-4 py-3 text-lg-xl-xs-lg",
                props?.className
            )}
            {...props}
        >
            {children}
        </caption>
    );
};

interface TableHeadProps extends React.ComponentProps<"thead"> {
    headers: Header;
    renderHeaders?: (headers: Header) => React.ReactElement;
}

const TableHead: React.FC<TableHeadProps> = ({
    headers,
    renderHeaders,
    ...props
}) => {
    if (renderHeaders) {
        return renderHeaders(headers);
    }

    return (
        <thead {...props}>
            <TableRow>
                {headers.map(header => (
                    <TableHeaderCell key={header}>{header}</TableHeaderCell>
                ))}
            </TableRow>
        </thead>
    );
};

type TableBodyProps<D> = {
    data: D[];
    renderData?: (data: D[]) => React.ReactElement;
} & React.ComponentProps<"tbody">;

const TableBody = <D extends DataType>({
    data,
    renderData,
    ...props
}: TableBodyProps<D>) => {
    const { uniqueKey } = useTableContext();

    if (renderData) {
        return renderData(data);
    }

    return (
        <tbody
            className="[&>*:nth-child(odd)]:bg-quaternary"
            {...props}
        >
            {data.map(row => {
                return (
                    <TableRow key={row[uniqueKey]}>
                        {Object.values(row)?.map((value, index) => (
                            <TableCell key={index}>{value}</TableCell>
                        ))}
                    </TableRow>
                );
            })}
        </tbody>
    );
};

interface TableRowHeaderCellProps extends React.ComponentProps<"th"> {}

export const RowHeaderCell: React.FC<TableRowHeaderCellProps> = ({
    className,
    scope = "row",
    ...props
}) => {
    return (
        <th
            scope={scope}
            className={cnBase(
                "px-3 py-2 text-center font-secondary text-sm-base-xs-lg font-normal",
                className
            )}
            {...props}
        />
    );
};

interface TableRowProps extends React.ComponentPropsWithoutRef<"tr"> {}

export const TableRow: React.FC<TableRowProps> = ({
    className,
    children,
    ...props
}) => {
    const { components } = useTableContext();

    if (components === undefined || components.Row === undefined)
        return (
            <tr
                className={className}
                {...props}
            >
                {children}
            </tr>
        );

    const { Row } = components;
    const RowElement = Row(props);

    const { className: rowClassName, ...RowProps } = RowElement.props;

    return React.cloneElement(RowElement, {
        className: cnBase(className, rowClassName),
        children,
        // ...props,
        ...RowProps
    });
};

interface TableHeaderCellProps extends React.ComponentProps<"th"> {}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
    className,
    scope = "col",
    children,
    ...props
}) => {
    return (
        <th
            scope={scope}
            className={cnBase(
                "px-4 py-2 text-lg-xl-xs-lg uppercase",
                className
            )}
            {...props}
        >
            {children}
        </th>
    );
};

interface TableCellProps extends React.ComponentProps<"td"> {}

export const TableCell: React.FC<TableCellProps> = ({
    className,
    children,
    ...props
}) => {
    const { components } = useTableContext();

    if (components === undefined || components.Cell === undefined)
        return (
            <td
                className={cnBase(
                    "whitespace-nowrap px-3 py-2 text-center font-secondary text-sm-base-xs-lg",
                    className
                )}
                {...props}
            >
                {children}
            </td>
        );

    const { Cell } = components;
    const CellElement = Cell(props);

    const { className: cellClassName, ...CellProps } = CellElement.props;

    return React.cloneElement(CellElement, {
        className: cnBase(
            "px-3 py-2 text-center font-secondary text-sm-base-xs-lg",
            className,
            cellClassName
        ),
        children,
        // ...props,
        ...CellProps
    });

    // return (
    //     <td
    //         className={cnBase(
    //             "px-3 py-2 text-center font-secondary text-sm-base-xs-lg",
    //             className
    //         )}
    //         {...props}
    //     >
    //         {children}
    //     </td>
    // );
};
