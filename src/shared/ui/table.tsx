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
    TableCaption?: () => React.ReactElement<
        React.ComponentPropsWithoutRef<"caption">,
        "caption"
    >;
    TableRow?: (
        props: React.ComponentPropsWithoutRef<"tr">
    ) => React.ReactElement<React.ComponentPropsWithoutRef<"tr">, "tr">;
    // TableRow?: JSX.IntrinsicElements["tr"];
    // TableRow?: React.ReactElement<HTMLTableCellElement>;
    TableCell?: () => React.ReactElement;
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
    renderHeaders?: (headers: Header) => React.ReactElement;
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
    renderHeaders,
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

    if (components === undefined || components.TableCaption === undefined) {
        return null;
    }

    const caption = components?.TableCaption();
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
                // if (rowHeaderKey === undefined) {
                // }

                const { ...restData } = row;
                return (
                    <TableRow key={uniqueKey}>
                        {Object.keys(restData)?.map(key => (
                            <TableCell key={key}>{row[key]}</TableCell>
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

    if (components === undefined || components.TableRow === undefined)
        return (
            <tr
                className={className}
                {...props}
            >
                {children}
            </tr>
        );

    const { TableRow } = components;
    const TableRowElement = TableRow(props);

    const { className: rowClassName, ...tableRowProps } = TableRowElement.props;

    return React.cloneElement(TableRowElement, {
        className: cnBase(className, rowClassName),
        children,
        // ...props,
        ...tableRowProps
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
    return (
        <td
            className={cnBase(
                "px-3 py-2 text-center font-secondary text-sm-base-xs-lg",
                className
            )}
            {...props}
        >
            {children}
        </td>
    );
};
