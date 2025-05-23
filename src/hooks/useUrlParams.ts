import { useSearchParams, useNavigate } from 'react-router';

export function useUrlParams() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const updateUrlParams =
        (paramsToUpdate: Record<string, string | number | undefined>) => {
            const newParams = new URLSearchParams(searchParams);
            Object.entries(paramsToUpdate).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    newParams.set(key, value.toString());
                } else {
                    newParams.delete(key);
                }
            });

            navigate(`?${newParams.toString()}`);
        }

    const getParam =
        (key: string): string | null => {
            return searchParams.get(key);
        }
    const getAllParams = (): Record<string, string> => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }

    return {
        updateUrlParams,
        getParam,
        getAllParams,
    };
}