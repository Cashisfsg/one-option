import { Search } from "@/shared/ui/search";

interface SearchReferralFormProps {
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

interface FormFields {
    query: HTMLInputElement;
}

export const SearchReferralForm: React.FC<SearchReferralFormProps> = ({
    setQuery
}) => {
    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = event => {
        event.preventDefault();

        const { query } = event.currentTarget;
        setQuery(query.value);
    };

    return (
        <Search.Root className="flex justify-end">
            <Search.Form
                onSubmit={onSubmitHandler}
                className="grid h-11 w-full max-w-96 grid-cols-[1fr_auto] rounded-full bg-quaternary"
            >
                <Search.Input
                    placeholder="ID пользователя или Email"
                    className="h-full w-full rounded-l-full bg-transparent px-4 placeholder:text-white/15"
                />
                <Search.Button className="flex size-11 items-center justify-center rounded-r-full">
                    <span className="sr-only">Поиск</span>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.6132 15.5158C18.7994 13.901 19.5 11.9073 19.5 9.75C19.5 4.36522 15.1348 0 9.75 0C4.36522 0 0 4.36522 0 9.75C0 15.1348 4.36522 19.5 9.75 19.5C11.9079 19.5 13.902 18.799 15.5171 17.6123L15.5158 17.6132C15.5601 17.6732 15.6093 17.7307 15.6636 17.785L21.4393 23.5607C22.0251 24.1465 22.9749 24.1465 23.5607 23.5607C24.1465 22.9749 24.1465 22.0251 23.5607 21.4393L17.785 15.6636C17.7307 15.6093 17.6732 15.5601 17.6132 15.5158ZM18 9.75C18 14.3063 14.3063 18 9.75 18C5.19365 18 1.5 14.3063 1.5 9.75C1.5 5.19365 5.19365 1.5 9.75 1.5C14.3063 1.5 18 5.19365 18 9.75Z"
                            fill="white"
                        />
                    </svg>
                </Search.Button>
            </Search.Form>
        </Search.Root>
    );
};
