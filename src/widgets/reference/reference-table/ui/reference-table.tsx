import { useFetchReferenceLinksQuery } from "@/entities/reference/api";
import { ClipboardCopyButton } from "@/shared/ui/clipboard-copy-button";

import { Fetch } from "@/shared/ui/fetch";
import { Table } from "@/shared/ui/table";

import IconsSprite from "@/assets/img/svg/icons-spite.svg";

export const ReferenceTable = () => {
    return (
        <Fetch
            useQuery={useFetchReferenceLinksQuery}
            args={undefined}
            renderSuccess={data => (
                <Table
                    uniqueKey={"code"}
                    headers={["id", "ссылка", "тип", "программа"]}
                    data={data}
                    components={{
                        ColumnHead: () => <td className="uppercase" />
                    }}
                    renderData={data => (
                        <tbody className="[&>*:nth-child(odd)]:bg-quaternary">
                            {data.map(row => (
                                <tr key={row.code}>
                                    <td className="whitespace-nowrap px-3 py-2 text-center font-secondary text-sm-base-xs-lg">
                                        <ClipboardCopyButton
                                            textToCopy={row.code}
                                            style={{ outline: "none" }}
                                            className="group grid grid-cols-[repeat(2,_max-content)] items-center gap-x-2"
                                        >
                                            {row.code}
                                            <svg
                                                height="1rem"
                                                width="1rem"
                                                className="opacity-0 transition-opacity duration-300 mh:group-hover:opacity-100"
                                            >
                                                <use
                                                    xlinkHref={`${IconsSprite}#copy`}
                                                />
                                            </svg>
                                        </ClipboardCopyButton>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-2 text-center font-secondary text-sm-base-xs-lg">
                                        <ClipboardCopyButton
                                            textToCopy={row.link}
                                            style={{ outline: "none" }}
                                            className="group grid grid-cols-[repeat(2,_max-content)] items-center gap-x-2"
                                        >
                                            {row.link}
                                            <svg
                                                height="1rem"
                                                width="1rem"
                                                className="opacity-0 transition-opacity duration-300 mh:group-hover:opacity-100"
                                            >
                                                <use
                                                    xlinkHref={`${IconsSprite}#copy`}
                                                />
                                            </svg>
                                        </ClipboardCopyButton>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-2 text-center font-secondary text-sm-base-xs-lg">
                                        {row.type_display}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-2 text-center font-secondary text-sm-base-xs-lg">
                                        {row.referral_type}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                />
            )}
        />
    );
};
