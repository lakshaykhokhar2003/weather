export const capitalize = (str: string): string => {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const getHours = (dt: string): string => {
    const date = new Date(dt);
    let hours: number | string = date.getHours();
    let format: string = "AM";

    if (hours > 11) {
        format = "PM";
        if (hours > 12) hours -= 12;
    }
    return `${hours}:00 ${format}`;
}