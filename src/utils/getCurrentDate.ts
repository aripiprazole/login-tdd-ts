const getCurrentDate = () => {
    const date = new Date();

    const year = date.getFullYear();

    const month = date.getMonth();

    const day = date.getDay();

    const hour = date.getHours();

    const minute = date.getMinutes();

    const seconds = date.getSeconds();

    return `${year}-${day}-${month} ${hour}:${minute}:${seconds}`;
};

export default getCurrentDate;
