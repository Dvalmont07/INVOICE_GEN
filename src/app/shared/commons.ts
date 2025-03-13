class Commons {

    public static getDueDate(customDay: number) {
        const currentDate = new Date();
        if (customDay === 0) {
            customDay = new Date().getDate();
        }
        return new Date(`${currentDate.getMonth() + 1}/${customDay}/${currentDate.getFullYear()}`);
    }
}