

export const buildSearchParams = (params) => {
    const result = {};

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            if (value.length) result[key] = value.join(",");
            return;
        }

        if (value !== "" && value !== null && value !== undefined) {
            result[key] = value;
        }
    });

    return result;
};

export const parseSearchParams = (searchParams) => {
    const params = Object.fromEntries(searchParams);

    Object.keys(params).forEach((key) => {
        if (typeof params[key] === "string" && params[key].includes(",")) {
            params[key] = params[key].split(",");
        }
    });

    return params;
};

export const updateFormData = (key, value, type, checked) => {
    if (type === "checkbox") {
        return (prev) => {
            const list = prev[key] || [];

            return {
                ...prev,
                [key]: checked ? [...list, value] : list.filter((v) => v !== value),
            };
        };
    }

    return (prev) => ({
        ...prev,
        [key]: value,
    });
};

export const updateSearchParams = (searchParams, updates) => {
    const merged = Object.fromEntries(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
        merged[key] = String(value);
    });

    return new URLSearchParams(Object.entries(merged));
};

export const cleanParams = (init) => {
    return Object.fromEntries(
        Object.entries(init).filter((item) => {
            const initValue = item[1];
            return (
                initValue !== null &&
                initValue !== undefined &&
                (typeof initValue === "string" ? initValue.trim() !== "" : true) &&
                (!Array.isArray(initValue) || initValue.length > 0)
            );
        }).map(([key, val]) => [key, String(val)])
    );
};

export const createParams = (
    data,
    keyMap
) => {
    const params = new URLSearchParams(data);

    Object.entries(keyMap).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
            params.set(key, String(value));
        }
    });

    return params;
};