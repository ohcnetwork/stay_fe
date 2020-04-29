export function getAppliedFilters(options = null, all = false) {
    const appliedFilters = JSON.parse(localStorage.getItem("applied_filters"));
    let currentForm = {
        checkin: stringFromDate(new Date()),
        checkout: stringFromDate(
            new Date(+new Date() + 15 * 60 * 60 * 24 * 1000)
        ),
    };

    if (appliedFilters) {
        if (options) {
            currentForm.category = options.category.includes(
                appliedFilters.category
            )
                ? appliedFilters.category
                : options.category[0];
            currentForm.district = options.district.includes(
                appliedFilters.district
            )
                ? appliedFilters.district
                : options.district[0];
            currentForm.minimum =
                appliedFilters.minimum &&
                appliedFilters.minimum >= options.minimum
                    ? appliedFilters.minimum
                    : options.minimum;
            currentForm.maximum =
                appliedFilters.maximum &&
                appliedFilters.maximum <= options.maximum
                    ? appliedFilters.maximum
                    : options.maximum;
        }
        if (all) {
            console.log(appliedFilters.minimum);
            currentForm.category = appliedFilters.category || "";
            currentForm.district = appliedFilters.district || "";
            currentForm.minimum = appliedFilters.minimum || 0;
            currentForm.maximum = appliedFilters.maximum || "";
        }
        currentForm.beds =
            appliedFilters.beds > 0 && appliedFilters.beds <= 20
                ? appliedFilters.beds
                : "";
        currentForm.checkin =
            new Date(appliedFilters.checkin) &&
            new Date(appliedFilters.checkin) > +new Date() - 24 * 60 * 60 * 1000
                ? appliedFilters.checkin
                : currentForm.checkin;
        currentForm.checkout =
            new Date(appliedFilters.checkout) &&
            new Date(appliedFilters.checkout) > new Date(appliedFilters.checkin)
                ? appliedFilters.checkout
                : currentForm.checkout;
    }

    return currentForm;
}

export function setAppliedFilters(filters) {
    console.log(filters);
    localStorage.setItem("applied_filters", JSON.stringify(filters));
}

export function stringFromDate(date) {
    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000 * -1;
    const offsetedDate = new Date(+date + timezoneOffset);
    return offsetedDate.toISOString().slice(0, -14);
}
